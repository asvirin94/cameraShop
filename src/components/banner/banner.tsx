import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import { EffectCreative } from 'swiper/modules';
import { useAppSelector } from '../../hooks';
import { getPromos } from '../../store/data-process/data-process.selectors';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../consts';


export default function Banner() {

  const promos = useAppSelector(getPromos);

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
        <div className="swiper-wrapper">
          {promos.map((promo) => (
            <SwiperSlide key={promo.id}>
              <div className="swiper-slide">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={promo.previewImgWebp}
                  />
                  <img
                    src={promo.previewImg}
                    srcSet={promo.previewImgWebp2x}
                    width="1280"
                    height="280"
                    alt="баннер"
                  />
                </picture>
                <p className="banner__info">
                  <span className="banner__message">Новинка!</span>
                  <span className="title title--h1">
                    {promo.name}
                  </span>
                  <span className="banner__text">
              Профессиональная камера от&nbsp;известного производителя
                  </span>
                  <Link className="btn" to={`/${AppRoutes.Product}${promo.id}/description`}>
              Подробнее
                  </Link>
                </p>
              </div>
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
}
