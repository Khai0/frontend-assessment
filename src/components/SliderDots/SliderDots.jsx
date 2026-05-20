import styles from "./SliderDots.module.scss";
import clsx from "clsx";

export default function SliderDots({ slides, current, onDotClick }) {
  return (
    <div
      className={styles.sliderDots}
      role="group"
      aria-label="Slide navigation"
    >
      {slides.map((slide, index) => (
        <button
          type="button"
          key={slide.id}
          className={clsx(styles.dot, index === current && styles.dotActive)}
          onClick={() => onDotClick(index)}
          aria-current={index === current ? "true" : undefined}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
}
