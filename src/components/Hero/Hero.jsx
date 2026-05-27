import { useRef, useState } from "react";
import slidesData from "../../data/slides.json";
import Slider from "./Slider";
import SliderButtons from "./SliderButtons";
import SliderDots from "../SliderDots/SliderDots";

export default function Hero() {
  const swiperRef = useRef(null);
  const [current, setCurrent] = useState(0);

  const handlePrev = () => swiperRef.current?.slidePrev();
  const handleNext = () => swiperRef.current?.slideNext();
  const handleDotClick = (index) => swiperRef.current?.slideToLoop(index);

  return (
    <section
      id="exercise1-top"
      className="hero w-full"
      aria-label="Featured products"
      aria-roledescription="carousel"
    >
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {`Slide ${current + 1} of ${slidesData.length}`}
      </div>

      <div className="hero__stage relative w-full">
        <Slider
          slides={slidesData}
          onActiveIndexChange={setCurrent}
          onSwiperReady={(swiper) => {
            swiperRef.current = swiper;
            if (swiper.realIndex !== 0) setCurrent(swiper.realIndex);
          }}
        />

        <SliderButtons onPrev={handlePrev} onNext={handleNext} />

        <div className="hero__dots absolute left-1/2 z-10 bottom-4 -translate-x-1/2 md:bottom-5">
          <SliderDots
            slides={slidesData}
            current={current}
            onDotClick={handleDotClick}
          />
        </div>
      </div>
    </section>
  );
}
