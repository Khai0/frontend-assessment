import ArrowIcon from "../Icons/icon";

export default function SliderButtons({ onPrev, onNext }) {
  return (
    <div className="absolute inset-x-0 top-[48%] z-10 flex w-full items-center justify-between pointer-events-none -translate-y-1/2 h-11 lg:top-1/2 lg:h-14">
      <button
        className="group flex items-center justify-center shrink-0 bg-transparent border-none text-white cursor-pointer pointer-events-auto transition-colors duration-200 w-9 h-11 lg:w-20 lg:h-14 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-[-2px]"
        onClick={onPrev}
        aria-label="Previous slide"
        type="button"
      >
        <ArrowIcon
          direction="left"
          className="transition-transform duration-200 group-hover:-translate-x-0.5"
        />
      </button>

      <button
        className="group flex items-center justify-center shrink-0 bg-transparent border-none text-white cursor-pointer pointer-events-auto transition-colors duration-200 w-9 h-11 lg:w-20 lg:h-14 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-[-2px]"
        onClick={onNext}
        aria-label="Next slide"
        type="button"
      >
        <ArrowIcon
          direction="right"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </button>
    </div>
  );
}
