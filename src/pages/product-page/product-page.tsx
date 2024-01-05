import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getProducts } from '../../store/data-process/data-process.selectors';
import {
  closeAllModal,
  setModalIsOpen,
  setProductOnPage,
  setisModalAddToBusketOpen,
  setproductToAdd,
} from '../../store/app-process/app-process.slice';
import Modal from '../../components/modal/modal';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import Slider from '../../components/slider/slider';
import Reviews from '../../components/reviews/reviews';
import { useEffect } from 'react';
import RatingStars from '../../components/rating-stars/rating-stars';

export default function ProductPage() {
  const { id, tab } = useParams();
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const navigate = useNavigate();

  const product = products.find((item) => item.id === +(id as string));

  useEffect(() => {
    let isMount = true;

    if(isMount) {
      dispatch(setProductOnPage(product));
      document.addEventListener('keydown', (evt) => {
        if(evt.key === 'Escape') {
          dispatch(closeAllModal());
        }
      });
    }

    return () => {
      isMount = false;
    };
  }, [product]);

  const propertyTabClassname =
    tab === 'properties' ? 'tabs__element is-active' : 'tabs__element';
  const descriptionTabClassname =
    tab === 'description' ? 'tabs__element is-active' : 'tabs__element';


  if (product) {

    return (
      <>
        <Helmet title={product.name}></Helmet>
        <div className="wrapper">
          <Header />
          <main>
            <div className="page-content">
              <div className="breadcrumbs">
                <div className="container">
                  <ul className="breadcrumbs__list">
                    <li className="breadcrumbs__item">
                      <a className="breadcrumbs__link" href="index.html">
                        Главная
                        <svg width="5" height="8" aria-hidden="true">
                          <use xlinkHref="#icon-arrow-mini"></use>
                        </svg>
                      </a>
                    </li>
                    <li className="breadcrumbs__item">
                      <a className="breadcrumbs__link" href="catalog.html">
                        Каталог
                        <svg width="5" height="8" aria-hidden="true">
                          <use xlinkHref="#icon-arrow-mini"></use>
                        </svg>
                      </a>
                    </li>
                    <li className="breadcrumbs__item">
                      <span className="breadcrumbs__link breadcrumbs__link--active">
                        {product?.name}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="page-content__section">
                <section className="product">
                  <div className="container">
                    <div className="product__img">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={`/${product?.previewImgWebp}, /${product?.previewImgWebp2x}`}
                        />
                        <img
                          src={product.previewImg}
                          srcSet={product.previewImg2x}
                          width="560"
                          height="480"
                          alt={product.name}
                        />
                      </picture>
                    </div>
                    <div className="product__content">
                      <h1 className="title title--h3">{product.name}</h1>
                      <div className="rate product__rate">
                        <RatingStars rating={product.rating}/>
                        <p className="visually-hidden">
                          Рейтинг: {product.rating}
                        </p>
                        <p className="rate__count">
                          <span className="visually-hidden">Всего оценок:</span>
                          {product.reviewCount}
                        </p>
                      </div>
                      <p className="product__price">
                        <span className="visually-hidden">Цена:</span>
                        {product.price} ₽
                      </p>
                      <button
                        className="btn btn--purple"
                        type="button"
                        onClick={() => {
                          dispatch(setModalIsOpen(true));
                          dispatch(setisModalAddToBusketOpen(true));
                          dispatch(setproductToAdd(product));
                        }}
                      >
                        <svg width="24" height="16" aria-hidden="true">
                          <use xlinkHref="#icon-add-basket"></use>
                        </svg>
                        Добавить в корзину
                      </button>
                      <div className="tabs product__tabs">
                        <div className="tabs__controls product__tabs-controls">
                          <button
                            className={`tabs__control ${
                              tab === 'properties' ? 'is-active' : ''
                            }`}
                            type="button"
                            onClick={() => {
                              if (tab === 'description') {
                                navigate(`/product/${product.id}/properties`);
                              }
                            }}
                          >
                            Характеристики
                          </button>
                          <button
                            className={`tabs__control ${
                              tab === 'description' ? 'is-active' : ''
                            }`}
                            type="button"
                            onClick={() => {
                              if (tab === 'properties') {
                                navigate(`/product/${product.id}/description`);
                              }
                            }}
                          >
                            Описание
                          </button>
                        </div>
                        <div className="tabs__content">
                          <div className={propertyTabClassname}>
                            <ul className="product__tabs-list">
                              <li className="item-list">
                                <span className="item-list__title">
                                  Артикул:
                                </span>
                                <p className="item-list__text">
                                  {product.vendorCode}
                                </p>
                              </li>
                              <li className="item-list">
                                <span className="item-list__title">
                                  Категория:
                                </span>
                                <p className="item-list__text">
                                  {product.category}
                                </p>
                              </li>
                              <li className="item-list">
                                <span className="item-list__title">
                                  Тип камеры:
                                </span>
                                <p className="item-list__text">
                                  {product.type}
                                </p>
                              </li>
                              <li className="item-list">
                                <span className="item-list__title">
                                  Уровень:
                                </span>
                                <p className="item-list__text">
                                  {product.level}
                                </p>
                              </li>
                            </ul>
                          </div>
                          <div className={descriptionTabClassname}>
                            <div className="product__tabs-text">
                              {product.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <Slider />
              <Reviews />
            </div>
            <Modal/>
          </main>
          <a
            className="up-btn"
            onClick={() =>
              scrollTo({
                top: 0,
                behavior: 'smooth',
              })}
          >
            <svg width="12" height="18" aria-hidden="true">
              <use xlinkHref="#icon-arrow2"></use>
            </svg>
          </a>
          <Footer />
        </div>
      </>
    );
  } else {
    return null;
  }
}
