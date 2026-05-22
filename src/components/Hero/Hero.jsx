import slidesData from "../../data/slides.json";
import { useSlider } from "../../hooks/useSlider";
import Slider from "./Slider";
import SliderButtons from "./SliderButtons";
import SliderDots from "../SliderDots/SliderDots";

export default function Hero() {
  const { current, prev, next, goTo } = useSlider(slidesData.length, {
    autoPlay: true,
    interval: 6000,
  });

  return (
    <section className="w-full" aria-label="Featured products">
      <div className="relative w-full">
        <Slider
          slides={slidesData}
          current={current}
          onPrev={prev}
          onNext={next}
        />

        <SliderButtons onPrev={prev} onNext={next} />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 md:bottom-5">
          <SliderDots slides={slidesData} current={current} onDotClick={goTo} />
        </div>
      </div>
    </section>
  );
}
