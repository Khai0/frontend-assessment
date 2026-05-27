import { Autoplay, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import HeadingBlock from "./HeadingBlock";

export default function Slider({ slides, onActiveIndexChange, onSwiperReady }) {
  return (
    <div className="slider relative w-full aspect-[375/698] overflow-hidden bg-hero-bg lg:aspect-[1920/1080]">
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
        className="slider__swiper w-full h-full"
        onSwiper={onSwiperReady}
        onRealIndexChange={(swiper) => onActiveIndexChange(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={slide.id}
            className="slider__slide relative h-full select-none"
          >
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
                className="slider__img w-full h-full object-cover pointer-events-none"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : undefined}
                draggable={false}
              />
            </picture>

            <div className="slider__content absolute inset-x-0 bottom-0 z-[5]">
              <HeadingBlock content={slide.hero} headingAs="h1" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
