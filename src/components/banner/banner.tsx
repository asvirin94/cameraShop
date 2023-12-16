import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import { EffectCreative } from 'swiper/modules';


export default function Banner() {

  return (
    <div className='banner'>
      <Swiper
        effect={'creative'}
        autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true}}
        loop
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ['-100%', 0, -500],
          },
          next: {
            shadow: true,
            translate: ['120%', 0, -500],
          },
        }}
        modules={[EffectCreative, Autoplay, Pagination]}
        pagination={{ clickable: true}}
        style={{
          height: '280px',
          '--swiper-pagination-color': '#7575E2',
          '--swiper-pagination-bullet-inactive-color': '#F4F4FC',
          '--swiper-pagination-bullet-size': '14px',
          '--swiper-pagination-bottom': '22px',
          '--swiper-pagination-left': '800px'
        } as React.CSSProperties}
      >
        <SwiperSlide>
          <div className="swiper-slide">
            <picture>
              <source
                type="image/webp"
                srcSet="
                img/content/promo_click_pro.webp,
                img/content/promo_click_pro@2x.webp 2x
              "
              />
              <img
                src="img/content/promo_click_pro.jpg"
                srcSet="img/content/promo_click_pro@2x.webp 2x"
                width="1280"
                height="280"
                alt="баннер"
              />
            </picture>
            <p className="banner__info">
              <span className="banner__message">Новинка!</span>
              <span className="title title--h1">
            Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i
              </span>
              <span className="banner__text">
            Профессиональная камера от&nbsp;известного производителя
              </span>
              <a className="btn" href="#">
            Подробнее
              </a>
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-slide">
            <picture>
              <source
                type="image/webp"
                srcSet="
                img/content/promo_click-lite-r.webp,
                img/content/promo_click-lite-r@2x.webp 2x
              "
              />
              <img
                src="img/content/promo_click-lite-r.jpg"
                srcSet="img/content/promo_click-lite-r@2x.webp 2x"
                width="1280"
                height="280"
                alt="баннер"
              />
            </picture>
            <p className="banner__info">
              <span className="banner__message">Новинка!</span>
              <span className="title title--h1">
            Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i
              </span>
              <span className="banner__text">
            Профессиональная камера от&nbsp;известного производителя
              </span>
              <a className="btn" href="#">
            Подробнее
              </a>
            </p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="swiper-slide">
            <picture>
              <source
                type="image/webp"
                srcSet="
                img/content/promo-look-54.webp,
                img/content/promo-look-54@2x.jpg 2x
              "
              />
              <img
                src="img/content/promo-look-54.jpg"
                srcSet="img/content/promo-look-54@2x.jpg 2x"
                width="1280"
                height="280"
                alt="баннер"
              />
            </picture>
            <p className="banner__info">
              <span className="banner__message">Новинка!</span>
              <span className="title title--h1">
            Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i
              </span>
              <span className="banner__text">
            Профессиональная камера от&nbsp;известного производителя
              </span>
              <a className="btn" href="#">
            Подробнее
              </a>
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
