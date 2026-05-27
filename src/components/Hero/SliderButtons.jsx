import ArrowIcon from "../Icons/icon";

export default function SliderButtons({ onPrev, onNext }) {
  return (
    <div className="slider-buttons absolute inset-x-0 top-[48%] z-10 flex w-full h-11 items-center justify-between -translate-y-1/2 pointer-events-none lg:top-1/2 lg:h-14">
      <button
        className="
        slider-buttons__btn group
        flex items-center justify-center w-9 h-11 shrink-0
        border-none bg-transparent cursor-pointer pointer-events-auto
        text-white transition-colors duration-200
        hover:bg-white/20
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-[-2px]
        lg:w-20 lg:h-14
      "
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
        className="
          slider-buttons__btn group
          flex items-center justify-center w-9 h-11 shrink-0
          border-none bg-transparent cursor-pointer pointer-events-auto
          text-white transition-colors duration-200
          hover:bg-white/20
          focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-[-2px]
          lg:w-20 lg:h-14
        "
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
