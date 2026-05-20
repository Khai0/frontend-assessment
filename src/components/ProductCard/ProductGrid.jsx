import ArcProductCard from "../ProductCard/ArcProductCard";
import styles from "./ProductGrid.module.scss";

export default function ProductGrid({ sectionHeading, products }) {
  return (
    <section className={styles.productGrid} aria-label="Product listing">
      <div className={styles.container}>
        <h2 className={styles.sectionHeading}>{sectionHeading}</h2>
        <div className={styles.cardGrid}>
          {products.map((product) => (
            <ArcProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
