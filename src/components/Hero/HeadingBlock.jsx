import styles from "./HeadingBlock.module.scss";
import clsx from "clsx";

export default function HeadingBlock({ content, onNavigate = () => {} }) {
  const { eyebrow, heading, blurb, buttons } = content;

  const handleButtonClick = (action) => {
    onNavigate(action);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.headingBlock}>
      <div className={styles.textContent}>
        <div className={styles.content}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1 className={styles.heroHeadline}>{heading}</h1>
        </div>
        <p className={styles.blurb}>{blurb}</p>

        <div className={styles.buttonGroup}>
          {buttons.map((btn) => (
            <button
              type="button"
              key={btn.id}
              className={clsx(
                styles.btn,
                btn.variant === "primary"
                  ? styles.btnPrimary
                  : styles.btnSecondary,
              )}
              onClick={() => handleButtonClick(btn.action)}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.spacerLeft} aria-hidden="true" />
      <div className={styles.spacerRight} aria-hidden="true" />
    </div>
  );
}
