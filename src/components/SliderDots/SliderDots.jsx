import clsx from "clsx";

export default function SliderDots({ slides, current, onDotClick }) {
  return (
    <div className="slider-dots flex items-center justify-center w-full gap-3">
      {slides.map((slide, index) => (
        <button
          key={slide.id}
          type="button"
          className={clsx(
            "slider-dots__dot relative w-2 h-2 p-0 rounded-full border-none",
            "bg-dot cursor-pointer",
            "transition-[background,transform] duration-200",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-[2px]",
            index === current && "bg-white",
          )}
          onClick={() => onDotClick(index)}
          aria-pressed={index === current}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}
