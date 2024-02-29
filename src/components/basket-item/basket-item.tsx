import { useAppDispatch, useAppSelector } from '../../hooks';
import { getProductsInBasketData } from '../../store/app-process/app-process.selectors';
import {
  chandeProductInBasketCount,
  setIsModalRemoveItemOpen,
  setModalIsOpen,
  setProductInBasketCount,
  setRemovingItemId,
} from '../../store/app-process/app-process.slice';
import { ProductInBasket, ProductType } from '../../types/types';

type Props = {
  product: ProductType;
};

export default function BasketItem({ product }: Props) {
  const dispatch = useAppDispatch();
  const basketData = useAppSelector(getProductsInBasketData);
  const productInBasketData = basketData.find(
    (item) => item.id === product.id
  ) as ProductInBasket;

  const totalPrice = productInBasketData.count
    ? `${(product.price * productInBasketData.count).toLocaleString('ru-RU')}\u00A0₽`
    : `${product.price.toLocaleString('ru-RU')}\u00A0₽`;

  return (
    <li className="basket-item" key={product.id}>
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x}`}
          />
          <img
            src={product.previewImg}
            srcSet={product.previewImg2x}
            width="140"
            height="120"
            alt={product.name}
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{product.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул: </span>
            <span className="basket-item__number">{product.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">
            {`${product.type} ${product.category.toLowerCase()}`}
          </li>
          <li className="basket-item__list-item">
            {`${product.level} уровень`}
          </li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>
        {product.price.toLocaleString('ru-RU')} ₽
      </p>
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={() => dispatch(chandeProductInBasketCount({ id: product.id, count: -1 }))}
          disabled={productInBasketData.count === 1}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1"></label>
        <input
          type="number"
          id="counter1"
          aria-label="количество товара"
          value={productInBasketData.count || ''}
          onChange={(e) => {
            if (+e.target.value > 0 && +e.target.value < 100) {
              dispatch(
                setProductInBasketCount({
                  id: product.id,
                  count: +e.target.value,
                })
              );
            } else if (+e.target.value > 99) {
              dispatch(setProductInBasketCount({ id: product.id, count: 99 }));
            } else {
              dispatch(setProductInBasketCount({ id: product.id, count: 0 }));
            }
          }}
          onKeyDown={(e) => {
            if (e.key === '.' || e.key === ',' || e.key === '-') {
              e.preventDefault();
            }
          }}
          onBlur={(e) => {
            if (!e.target.value.length) {
              dispatch(setProductInBasketCount({ id: product.id, count: 1 }));
            }
          }}
          onFocus={(e) => e.target.select()}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={() => {
            dispatch(chandeProductInBasketCount({ id: product.id, count: 1 }));
          }}
          disabled={productInBasketData.count === 99}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>
        {totalPrice}
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={() => {
          dispatch(setRemovingItemId(productInBasketData.id));
          dispatch(setModalIsOpen(true));
          dispatch(setIsModalRemoveItemOpen(true));
        }}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}
