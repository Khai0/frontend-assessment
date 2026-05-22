import clsx from "clsx";

export default function SliderDots({ slides, current, onDotClick }) {
  return (
    <div
      className="inset-x-0 bottom-4 flex items-center justify-center w-full gap-3 md:bottom-5"
      role="group"
      aria-label="Slide navigation"
    >
      {slides.map((slide, index) => (
        <button
          type="button"
          key={slide.id}
          className={clsx(
            "dot-hit-area relative w-2 h-2 p-0 rounded-full border-none bg-dot cursor-pointer transition-[background,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-[2px]",
            index === current && "bg-white",
          )}
          onClick={() => onDotClick(index)}
          aria-current={index === current ? "true" : undefined}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}
