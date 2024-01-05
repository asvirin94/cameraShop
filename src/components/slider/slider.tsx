import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { loadSimilarProductsAction } from '../../store/api-actions';
import { getSimilarProducts } from '../../store/data-process/data-process.selectors';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import { SIMILAR_PRODUCTS_ON_PAGE_COUNT } from '../../consts';
import { getproductOnPage } from '../../store/app-process/app-process.selectors';
import RatingStars from '../rating-stars/rating-stars';


export default function Slider() {
  const dispatch = useAppDispatch();
  const product = useAppSelector(getproductOnPage);
  const similarProducts = useAppSelector(getSimilarProducts);
  const swiperRef = useRef<SwiperCore>();
  const [currentSimilarIndex, setCurrentSimilarIndex] = useState(0);

  const slidesCount = Math.ceil(
    similarProducts.length / SIMILAR_PRODUCTS_ON_PAGE_COUNT
  );
  const slidesArray = Array.from({ length: slidesCount });

  useEffect(() => {
    let isMounted = true;

    if (isMounted && product) {
      dispatch(loadSimilarProductsAction(product.id));
    }

    return () => {
      isMounted = false;
    };
  }, [product]);

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <Swiper
              modules={[Navigation]}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
            >
              {slidesArray.map((_, index) => (
                <SwiperSlide key={`slide-${index + 1}`}>
                  <div className="product-similar__slider-list">
                    {similarProducts
                      .slice(
                        index * SIMILAR_PRODUCTS_ON_PAGE_COUNT,
                        index * SIMILAR_PRODUCTS_ON_PAGE_COUNT +
                          SIMILAR_PRODUCTS_ON_PAGE_COUNT
                      )
                      .map((similarProduct) => (
                        <div
                          key={similarProduct.id}
                          className="product-card is-active"
                        >
                          <div className="product-card__img">
                            <picture>
                              <source
                                type="image/webp"
                                srcSet={`/${similarProduct.previewImgWebp}, /${similarProduct.previewImgWebp2x}`}
                              />
                              <img
                                src={similarProduct.previewImg}
                                srcSet={similarProduct.previewImg2x}
                                width="280"
                                height="240"
                                alt={similarProduct.name}
                              />
                            </picture>
                          </div>
                          <div className="product-card__info">
                            <div className="rate product-card__rate">
                              <RatingStars rating={similarProduct.rating}/>
                              <p className="visually-hidden">
                                Рейтинг: {similarProduct.rating}
                              </p>
                              <p className="rate__count">
                                <span className="visually-hidden">
                                  Всего оценок:
                                </span>
                                {similarProduct.reviewCount}
                              </p>
                            </div>
                            <p className="product-card__title">
                              {similarProduct.name}
                            </p>
                            <p className="product-card__price">
                              <span className="visually-hidden">Цена:</span>
                              {similarProduct.price}₽
                            </p>
                          </div>
                          <div className="product-card__buttons">
                            <button
                              className="btn btn--purple product-card__btn"
                              type="button"
                            >
                              Купить
                            </button>
                            <Link
                              onClick={() => {
                                swiperRef.current?.slideTo(0);
                                setCurrentSimilarIndex(0);
                                window.scrollTo({
                                  top: 0,
                                  behavior: 'smooth',
                                });
                              }}
                              className="btn btn--transparent"
                              to={`/product/${similarProduct.id}/description`}
                            >
                              Подробнее
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              disabled={currentSimilarIndex === 0}
              style={{ zIndex: '1000' }}
              onMouseDown={() => {
                swiperRef.current?.slidePrev();
                setCurrentSimilarIndex(
                  (prev) => prev - SIMILAR_PRODUCTS_ON_PAGE_COUNT
                );
              }}
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
            <button
              disabled={
                currentSimilarIndex + SIMILAR_PRODUCTS_ON_PAGE_COUNT >=
                similarProducts.length
              }
              style={{ zIndex: '1000' }}
              onMouseDown={() => {
                swiperRef.current?.slideNext();
                setCurrentSimilarIndex(
                  (prev) => prev + SIMILAR_PRODUCTS_ON_PAGE_COUNT
                );
              }}
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
            >
              <svg width="7" height="12" aria-hidden="true">
                <use xlinkHref="#icon-arrow"></use>
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
