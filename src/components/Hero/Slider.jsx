import clsx from "clsx";
import { useRef, useState } from "react";
import { useSliderTransition } from "../../hooks/useSliderTransition";
import HeadingBlock from "./HeadingBlock";

const DRAG_THRESHOLD = 50;

export default function Slider({ slides, current, onPrev, onNext }) {
  const extendedSlides = slides.length
    ? [slides[slides.length - 1], ...slides, slides[0]]
    : [];

  const { renderIndex, noTransition, handleTransitionEnd } =
    useSliderTransition(current, slides.length);

  const dragStartX = useRef(null);
  const isDragging = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);

  const handleDragStart = (clientX) => {
    dragStartX.current = clientX;
    isDragging.current = true;
  };

  const handleDragMove = (clientX) => {
    if (!isDragging.current) return;
    setDragOffset(clientX - dragStartX.current);
  };

  const handleDragEnd = () => {
    if (!isDragging.current) return;
    if (dragOffset < -DRAG_THRESHOLD) onNext();
    else if (dragOffset > DRAG_THRESHOLD) onPrev();
    isDragging.current = false;
    dragStartX.current = null;
    setDragOffset(0);
  };

  return (
    <div
      className="relative w-full overflow-hidden bg-hero-bg aspect-[375/698] lg:aspect-[1920/1080]"
      role="region"
      aria-label="Hero image slider"
      // Mouse
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      // Touch
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
    >
      <div
        className={clsx(
          "flex w-full h-full will-change-transform transition-transform duration-500 ease-in-out motion-reduce:transition-none",
          noTransition && "transition-none",
          isDragging.current && "transition-none",
        )}
        style={{
          transform: `translate3d(calc(${-(renderIndex + 1) * 100}% + ${dragOffset}px), 0, 0)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedSlides.map((slide, index) => {
          const isActive = index === renderIndex + 1;
          const isFirst = index === 1;
          return (
            <div
              key={`${slide.id}-${index}`}
              className="relative w-full h-full flex-[0_0_100%] select-none"
              aria-hidden={!isActive}
              inert={!isActive ? true : undefined}
            >
              <picture>
                <source
                  media="(min-width: 769px)"
                  srcSet={slide.image}
                  type="image/webp"
                />
                <source
                  media="(max-width: 768px)"
                  srcSet={slide.imageMobile}
                  type="image/webp"
                />
                <img
                  src={slide.imageMobile}
                  alt={slide.alt}
                  className="w-full h-full object-cover pointer-events-none"
                  loading={isFirst ? "eager" : "lazy"}
                  fetchPriority={isFirst ? "high" : "auto"}
                  draggable={false}
                />
              </picture>

              <div className="absolute inset-x-0 bottom-0 z-[5]">
                <HeadingBlock content={slide.hero} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
