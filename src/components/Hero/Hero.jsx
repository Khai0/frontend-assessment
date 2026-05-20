import slidesData from "../../data/slides.json";
import { useSlider } from "../../hooks/useSlider";
import Slider from "./Slider";
import SliderButtons from "./SliderButtons";
import SliderDots from "../SliderDots/SliderDots";
import styles from "./Hero.module.scss";

export default function Hero({ onNavigate }) {
  const { current, prev, next, goTo } = useSlider(slidesData.length, {
    autoPlay: true,
    interval: 6000,
  });

  return (
    <section className={styles.hero} aria-label="Featured products">
      <div className={styles.sliderWrapper}>
        <Slider 
          slides={slidesData} 
          current={current} 
          onNavigate={onNavigate} 
        />
        
        <SliderButtons 
          onPrev={prev} 
          onNext={next} 
        />

        <div className={styles.dotsWrapper}>
          <SliderDots 
            slides={slidesData} 
            current={current} 
            onDotClick={goTo} 
          />
        </div>
      </div>
    </section>
  );
}
