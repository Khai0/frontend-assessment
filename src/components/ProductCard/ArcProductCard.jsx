import styles from "./ArcProductCard.module.scss";
import { formatPrice } from "../../utils/formatPrice";

export default function ArcProductCard({ product }) {
  const {
    brandName,
    heading,
    price,
    originalPrice,
    imageDesktop,
    imageMobile,
    imageAlt,
  } = product;

  return (
    <article className={styles.arcProductCard}>
      <div className={styles.imageHolder}>
        <div className={styles.badgeWrapper}>
          <div className={styles.badgeTop} aria-hidden="true" />
          <div className={styles.badgeSide} aria-hidden="true" />
        </div>

        <picture>
          <source media="(min-width: 768px)" srcSet={imageDesktop} />
          <img
            src={imageMobile}
            alt={imageAlt}
            loading="lazy"
            className={styles.productImage}
          />
        </picture>
      </div>

      <div className={styles.info}>
        <div className={styles.name}>
          <span className={styles.linkOne}>{brandName}</span>
        </div>

        <div className={styles.headingPriceRow}>
          <div className={styles.heading}>
            <span className={styles.headingText}>{heading}</span>
          </div>
          <div className={styles.price}>
            <span className={styles.currentPrice}>{formatPrice(price)}</span>
            <span
              className={styles.originalPrice}
              aria-label={`Original price ${formatPrice(originalPrice)}`}
            >
              {formatPrice(originalPrice)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
