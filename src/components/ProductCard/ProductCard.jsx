import { formatPrice } from "../../utils/formatPrice";

export default function ProductCard({ product }) {
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
    <article
      className="
        product-card flex flex-col min-w-0 w-full
        overflow-hidden box-border
        bg-text-frame2
        shadow-card-mobile will-change-transform transition-all duration-300 ease-out
        hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_12px_32px_rgba(0,0,0,0.18)]
        md:shadow-card
      "
    >
      <a href={url} className="product-card__image-link block">
        <div className="product-card__media relative w-full aspect-[173.5/276] overflow-hidden md:aspect-[456/710]">
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
              className="product-card__img block w-full h-full object-cover"
            />
          </picture>
        </div>
      </a>

      <div className="product-card__body flex flex-col flex-shrink-0 w-full min-h-0 gap-1 p-2 lg:px-3">
        <div className="product-card__brand flex items-center min-w-0">
          <span
            className="
              block min-w-0 truncate
              font-pp font-medium text-[10px] leading-[15px] text-white
              md:font-sans md:font-normal md:text-[12px] md:leading-[14px]
            "
          >
            {brandName}
          </span>
        </div>

        <div className="product-card__meta flex flex-col items-start min-w-0 gap-1 md:flex-row md:items-center md:gap-2">
          <div className="product-card__heading flex items-center min-w-0 flex-1">
            <h3
              className="
                block min-w-0 m-0 truncate
                font-pp font-normal text-[10px] leading-[15px] text-white
                md:font-sans md:text-[12px] md:leading-[14px]
              "
            >
              {heading}
            </h3>
          </div>

          <div className="product-card__pricing flex items-baseline flex-shrink-0 w-auto h-[15px] gap-2 whitespace-nowrap">
            <span
              className="
                product-card__price
                font-pp font-normal text-[10px] leading-[14px] text-white
                md:font-sans md:text-[12px]
              "
            >
              {formatPrice(price)}
            </span>

            <span
              aria-hidden="true"
              className="
                product-card__price--original
                font-pp font-normal text-[10px] leading-[15px] text-price-strikethrough line-through
                md:font-sans md:text-[12px]
              "
            >
              {formatPrice(originalPrice)}
            </span>

            <span className="sr-only">
              Original price {formatPrice(originalPrice)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
