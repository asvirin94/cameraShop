import { Helmet } from 'react-helmet-async';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getIsPromoCodeApplied,
  getProductsInBasketData,
  getPromoCode,
} from '../../store/app-process/app-process.selectors';
import { getProducts } from '../../store/data-process/data-process.selectors';
import BasketItem from '../../components/basket-item/basket-item';
import { ProductType } from '../../types/types';
import { useRef, useState } from 'react';
import { checkIsPromoCodeCorrect, resetIsPromoApplayed, setIsModalOrderOpen, setModalIsOpen } from '../../store/app-process/app-process.slice';
import classNames from 'classnames';
import { DISCOUNT_VALUE } from '../../consts';
import { sendOrderAction } from '../../store/api-actions';
import Modal from '../../components/modal/modal';

export default function BasketPage() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const basketData = useAppSelector(getProductsInBasketData);
  const isPromoApplied = useAppSelector(getIsPromoCodeApplied);
  const promoCode = useAppSelector(getPromoCode);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isPromoApplyAttempted, setIsPromoApplyAttempted] = useState(false);

  const totalPrice = basketData.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.id);
    if (product) {
      return sum + product.price * item.count;
    } else {
      return sum;
    }
  }, 0);

  const discount = totalPrice * DISCOUNT_VALUE;

  const productsInBasketIds = basketData.map((p) => p.id);

  const applyPromoHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsPromoApplyAttempted(true);
    if (inputRef.current && inputRef.current.value.length) {
      dispatch(checkIsPromoCodeCorrect(inputRef.current.value));
      inputRef.current.value = '';
    }
  };

  const getSnowflakeElement = () => {
    if (isPromoApplyAttempted && isPromoApplied === null) {
      return (
        <svg width="9" height="9" aria-hidden="true">
          <use xlinkHref="#icon-snowflake"></use>
        </svg>
      );
    } else {
      return null;
    }
  };

  if (products.length) {
    return (
      <>
        <Helmet title="Корзина"></Helmet>
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
                        Корзина
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <section className="basket">
                <div className="container">
                  <h1 className="title title--h2">Корзина</h1>
                  <ul className="basket__list">
                    {basketData.map((item) => {
                      const product = products.find(
                        (p) => p.id === item.id
                      ) as ProductType;
                      return <BasketItem product={product} key={product.id} />;
                    })}
                  </ul>
                  <div className="basket__summary">
                    <div className="basket__promo">
                      <p className="title title--h4">
                        Если у вас есть промокод на скидку, примените его в этом
                        поле
                      </p>
                      <div className="basket-form">
                        <form action="#">
                          <div
                            className={classNames('custom-input', {
                              'is-valid': isPromoApplied,
                              'is-invalid': isPromoApplied === false,
                            })}
                          >
                            <label>
                              <span className="custom-input__label">
                                Промокод
                                {getSnowflakeElement()}
                              </span>
                              <input
                                type="text"
                                name="promo"
                                placeholder="Введите промокод"
                                ref={inputRef}
                                onKeyDown={(e) => {
                                  if (e.key === ' ') {
                                    e.preventDefault();
                                  }
                                }}
                                onChange={(e) => {
                                  const newValue = e.target.value.replace(
                                    /\s/g,
                                    ''
                                  );
                                  if (inputRef.current) {
                                    inputRef.current.value = newValue;
                                  }
                                }}
                              />
                            </label>
                            <p className="custom-input__error">
                              Промокод неверный
                            </p>
                            <p className="custom-input__success">
                              Промокод принят!
                            </p>
                          </div>
                          <button
                            className="btn"
                            type="submit"
                            onClick={applyPromoHandler}
                          >
                            Применить
                          </button>
                        </form>
                      </div>
                    </div>
                    <div className="basket__summary-order">
                      <p className="basket__summary-item">
                        <span className="basket__summary-text">Всего:</span>
                        <span className="basket__summary-value">
                          {totalPrice.toLocaleString('ru-RU')} ₽
                        </span>
                      </p>
                      <p className="basket__summary-item">
                        <span className="basket__summary-text">Скидка:</span>
                        <span
                          className={classNames('basket__summary-value', {
                            'basket__summary-value--bonus': isPromoApplied,
                          })}
                        >
                          {isPromoApplied
                            ? discount.toLocaleString('ru-RU')
                            : 0}{' '}
                          ₽
                        </span>
                      </p>
                      <p className="basket__summary-item">
                        <span className="basket__summary-text basket__summary-text--total">
                          К оплате:
                        </span>
                        <span className="basket__summary-value basket__summary-value--total">
                          {isPromoApplied
                            ? (totalPrice - discount).toLocaleString('ru-RU')
                            : totalPrice.toLocaleString('ru-RU')}{' '}
                          ₽
                        </span>
                      </p>
                      <button
                        className="btn btn--purple"
                        type="submit"
                        disabled={!basketData.length}
                        onClick={() => {
                          dispatch(
                            sendOrderAction({
                              camerasIds: productsInBasketIds,
                              coupon: promoCode,
                            })
                          )
                            .then(() => {
                              dispatch(setModalIsOpen(true));
                              dispatch(setIsModalOrderOpen(true));
                              dispatch(resetIsPromoApplayed());
                              setIsPromoApplyAttempted(false);
                            });
                        }}
                      >
                        Оформить заказ
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            <Modal />
          </main>
          <Footer />
        </div>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
}
