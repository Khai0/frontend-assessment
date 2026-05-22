import { formatPrice } from "../../utils/formatPrice";

export default function ArcProductCard({ product }) {
  const {
    url,
    brandName,
    heading,
    price,
    originalPrice,
    imageDesktop,
    imageMobile,
    imageAlt,
  } = product;

  return (
    <a href={url} className="block">
      <article className="flex flex-col min-w-0 box-border shadow-card-mobile overflow-hidden bg-text-frame2 hover:shadow-[0_4px_16px_rgba(0,0,0,0.15)] md:shadow-card">
        <div className="aspect-[173.5/276] relative w-full overflow-hidden md:aspect-[456/710]">
          <div className="absolute inset-x-0 top-0 z-[2] flex flex-col">
            <div aria-hidden="true" />
            <div aria-hidden="true" />
          </div>

          <picture>
            <source
              media="(min-width: 768px)"
              srcSet={imageDesktop}
              type="image/webp"
            />
            <source
              media="(max-width: 767px)"
              srcSet={imageMobile}
              type="image/webp"
            />
            <img
              src={imageMobile}
              alt={imageAlt}
              loading="lazy"
              className="block w-full h-full object-cover"
            />
          </picture>
        </div>

        <div className="flex flex-col flex-shrink-0 min-h-0 h-auto gap-1 p-2 lg:px-3">
          <div className="flex items-center min-w-0">
            <span className="block truncate font-pp font-medium text-[10px] leading-[15px] text-white md:font-sans md:font-normal md:text-[12px] md:leading-[14px]">
              {brandName}
            </span>
          </div>

          <div className="flex flex-col items-start gap-1 min-w-0 md:flex-row md:items-center md:gap-2">
            <div className="flex items-center min-w-0 flex-1">
              <span className="block min-w-0 truncate font-pp text-[10px] leading-[15px] font-normal text-white md:font-sans md:text-[12px] md:leading-[14px]">
                {heading}
              </span>
            </div>
            <div className="flex items-baseline flex-shrink-0 whitespace-nowrap gap-2 h-[15px]">
              <span className="text-white font-pp text-[10px] leading-[14px] font-normal md:font-sans md:text-[12px]">
                {formatPrice(price)}
              </span>
              <span
                className="line-through text-price-strikethrough font-pp text-[10px] leading-[15px] font-normal md:font-sans md:text-[12px]"
                aria-label={`Original price ${formatPrice(originalPrice)}`}
              >
                {formatPrice(originalPrice)}
              </span>
            </div>
          </div>
        </div>
      </article>
    </a>
  );
}
