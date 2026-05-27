import Hero from "../components/Hero/Hero";
import ProductGrid from "../components/ProductCard/ProductGrid";
import productsData from "../data/products.json";

export default function Exercise1() {
  return (
    <>
      <h1 className="sr-only">Exercise 1</h1>
      <Hero />
      <ProductGrid
        sectionHeading={productsData.sectionHeading}
        products={productsData.products}
      />
    </>
  );
}
