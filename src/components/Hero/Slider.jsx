import clsx from "clsx";
import { useSliderTransition } from "../../hooks/useSliderTransition";
import HeadingBlock from "./HeadingBlock";
import heroContent from "../../data/heroContent.json";
import styles from "./Slider.module.scss";

export default function Slider({ slides, current, onNavigate }) {
  const extendedSlides = slides.length
    ? [slides[slides.length - 1], ...slides, slides[0]]
    : [];

  const { renderIndex, noTransition, handleTransitionEnd } =
    useSliderTransition(current, slides.length);

  return (
    <div className={styles.slider} role="region" aria-label="Hero image slider">
      <div
        className={clsx(styles.track, noTransition && styles.noTransition)}
        style={{ transform: `translate3d(${-(renderIndex + 1) * 100}%, 0, 0)` }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedSlides.map((slide, index) => {
          const isActive = index === renderIndex + 1;
          return (
            <div
              key={`${slide.id}-${index}`}
              className={styles.slide}
              aria-hidden={!isActive}
              inert={!isActive ? true : undefined}
            >
              <picture>
                <source
                  media="(min-width: 769px)"
                  srcSet={slide.image}
                  type="image/webp"
                />
                <img
                  src={slide.imageMobile}
                  type="image/webp"
                  alt={slide.alt}
                  className={styles.image}
                  loading={index === 1 ? "eager" : "lazy"}
                  fetchPriority={index === 1 ? "high" : "auto"}
                />
              </picture>

              <div className={styles.headingOverlay}>
                <HeadingBlock content={heroContent} onNavigate={onNavigate} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}