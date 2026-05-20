import Hero from "../components/Hero/Hero";
import ProductGrid from "../components/ProductCard/ProductGrid";
import productsData from "../data/products.json";

export default function Exercise1({ onNavigate }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <ProductGrid
        sectionHeading={productsData.sectionHeading}
        products={productsData.products}
      />
    </>
  );
}
