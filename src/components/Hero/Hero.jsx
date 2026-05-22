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
      className="w-full scroll-mt-0"
      aria-label="Featured products"
    >
      <div className="relative w-full">
        <Slider
          slides={slidesData}
          onActiveIndexChange={setCurrent}
          onSwiperReady={(swiper) => {
            swiperRef.current = swiper;
            setCurrent(swiper.realIndex);
          }}
        />

        <SliderButtons onPrev={handlePrev} onNext={handleNext} />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 md:bottom-5">
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
