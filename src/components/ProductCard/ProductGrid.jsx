import ProductCard from "./ProductCard";

export default function ProductGrid({ sectionHeading, products }) {
  return (
    <section
      id="products"
      className="product-grid w-full bg-gray-bg scroll-mt-6 md:scroll-mt-8"
      aria-labelledby="products-heading"
    >
      <div className="product-grid__inner w-full max-w-screen-2xl mx-auto px-3 pt-8 pb-8 md:px-6 md:pt-16 md:pb-16">
        <h2
          id="products-heading"
          className="product-grid__heading block w-full px-3 mb-6 font-rb font-normal text-[32px] leading-[38px] text-center text-text-primary md:px-6 md:mb-12 md:font-sans md:text-[48px] md:leading-[1.15]"
        >
          {sectionHeading}
        </h2>
        <div className="product-grid__list grid grid-cols-2 gap-x-1 gap-y-2 md:grid-cols-4 md:gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
