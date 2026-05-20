import { useState, useCallback, useEffect, useRef } from "react";

export function useSlider(total, { autoPlay = true, interval = 4000 } = {}) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const startTimer = useCallback(() => {
    clearTimer();
    if (!autoPlay || total <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c === total - 1 ? 0 : c + 1));
    }, interval);
  }, [autoPlay, interval, total]);

  // Start on mount, cleanup on unmount
  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [startTimer]);

  const prev = useCallback(() => {
    setCurrent((c) => (c === 0 ? total - 1 : c - 1));
    startTimer();        // reset timer when user interact
  }, [total, startTimer]);

  const next = useCallback(() => {
    setCurrent((c) => (c === total - 1 ? 0 : c + 1));
    startTimer();        // reset timer when user interact
  }, [total, startTimer]);

  const goTo = useCallback((index) => {
    setCurrent(index);
    startTimer();        // reset timer when user interact
  }, [startTimer]);

  return { current, prev, next, goTo };
}