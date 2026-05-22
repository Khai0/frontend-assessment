import { Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HeadingBlock from "./HeadingBlock";

export default function Slider({ slides, onActiveIndexChange, onSwiperReady }) {
  return (
    <div
      className="relative w-full overflow-hidden bg-hero-bg aspect-[375/698] lg:aspect-[1920/1080]"
      role="region"
      aria-label="Hero image slider"
    >
      <Swiper
        modules={[Autoplay, A11y]}
        loop={slides.length > 1}
        speed={500}
        slidesPerView={1}
        grabCursor={slides.length > 1}
        autoplay={
          slides.length > 1
            ? {
                delay: 6000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        a11y={{
          enabled: true,
          prevSlideMessage: "Previous slide",
          nextSlideMessage: "Next slide",
        }}
        className="h-full w-full"
        onSwiper={onSwiperReady}
        onRealIndexChange={(swiper) => onActiveIndexChange(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id} className="relative h-full select-none">
            <picture>
              <source
                media="(min-width: 769px)"
                srcSet={slide.image}
                type="image/webp"
              />
              <source
                media="(max-width: 768px)"
                srcSet={slide.imageMobile}
                type="image/webp"
              />
              <img
                src={slide.imageMobile}
                alt={slide.alt}
                className="h-full w-full object-cover pointer-events-none"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
                draggable={false}
              />
            </picture>

            <div className="absolute inset-x-0 bottom-0 z-[5]">
              <HeadingBlock content={slide.hero} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
