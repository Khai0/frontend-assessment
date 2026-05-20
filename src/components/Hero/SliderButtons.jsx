import styles from "./SliderButtons.module.scss";
import ArrowIcon from "../Icons/icon";

export default function SliderButtons({ onPrev, onNext }) {
  return (
    <div className={styles.sliderButtons}>
      <button
        className={styles.btn}
        onClick={onPrev}
        aria-label="Previous slide"
        type="button"
      >
        <ArrowIcon direction="left" />
      </button>

      <button
        className={styles.btn}
        onClick={onNext}
        aria-label="Next slide"
        type="button"
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}
