import { useEffect, useRef, useState } from "react";

export function useSliderTransition(current, slidesLength) {
  const lastIndex = slidesLength - 1;

  const prevCurrentRef = useRef(current);
  const wrapLockRef = useRef(false);
  const [renderIndex, setRenderIndex] = useState(current);
  const [noTransition, setNoTransition] = useState(false);

  useEffect(() => {
    const prev = prevCurrentRef.current;

    if (wrapLockRef.current) {
      wrapLockRef.current = false;
      prevCurrentRef.current = current;
      return;
    }

    if (slidesLength <= 1) {
      setNoTransition(true);
      setRenderIndex(current);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setNoTransition(false));
      });
      prevCurrentRef.current = current;
      return;
    }

    // Wrap forward: last → first (slide to cloned-first after real last)
    if (prev === lastIndex && current === 0) {
      wrapLockRef.current = true;
      setRenderIndex(slidesLength);
      prevCurrentRef.current = current;
      return;
    }

    // Wrap backward: first → last (slide to cloned-last before real first)
    if (prev === 0 && current === lastIndex) {
      wrapLockRef.current = true;
      setRenderIndex(-1);
      prevCurrentRef.current = current;
      return;
    }

    // Normal navigation
    setNoTransition(false);
    setRenderIndex(current);
    prevCurrentRef.current = current;
  }, [current, lastIndex, slidesLength]);

  // After wrap animation ends, snap silently to the real slide
  const handleTransitionEnd = () => {
    if (slidesLength <= 1) return;

    if (renderIndex === slidesLength || renderIndex === -1) {
      const targetIndex = renderIndex === slidesLength ? 0 : lastIndex;

      wrapLockRef.current = false;
      setNoTransition(true);
      setRenderIndex(targetIndex);

      // Double rAF: let browser paint the snap before re-enabling transition
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setNoTransition(false);
        });
      });
    }
  };

  return { renderIndex, noTransition, handleTransitionEnd };
}
