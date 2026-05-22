import ArcProductCard from "../ProductCard/ArcProductCard";

export default function ProductGrid({ sectionHeading, products }) {
  return (
    <section className="w-full bg-gray-bg" aria-label="Product listing">
      <div className="w-full mx-auto max-w-screen-2xl px-3 pt-8 md:px-6 md:pt-16 pb-8 md:pb-16">
        <h2 className="text-center font-normal text-[32px] font-rb text-text-primary leading-[38px] px-3 mb-6 md:font-sans md:text-[48px] md:leading-[1.15] md:px-6 md:mb-12">
          {sectionHeading}
        </h2>
        <div className="grid grid-cols-2 gap-x-1 gap-y-2 md:grid-cols-4 md:gap-4">
          {products.map((product) => (
            <ArcProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
