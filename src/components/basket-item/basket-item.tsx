import { useEffect, useState } from 'react';
import { ProductType } from '../../types/types';
import { useAppDispatch } from '../../hooks';
import { changeTotalPrice, removeProductFromBasket } from '../../store/app-process/app-process.slice';

type Props = {
  product: ProductType;
}

export default function BasketItem({product}: Props) {
  const dispatch = useAppDispatch();
  const [countValue, setCountValue] = useState(1);

  useEffect(() => {
    let isMount = true;
    if(isMount) {
      dispatch(changeTotalPrice(product.price));
    }

    return () => {
      dispatch(changeTotalPrice(-product.price * countValue));
      isMount = false;
    };
  });

  return(
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
            <span className="basket-item__number">
              {product.vendorCode}
            </span>
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
        <span className="visually-hidden">Цена:</span>{product.price.toLocaleString('ru-RU')} ₽
      </p>
      <div className="quantity">
        <button
          disabled={countValue === 1}
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={() => {
            if(countValue > 1) {
              setCountValue((prev) => prev - 1);
              dispatch(changeTotalPrice(-product.price));
            }
          }}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
        <label
          className="visually-hidden"
          htmlFor="counter1"
        >
        </label>
        <input
          type="number"
          id="counter1"
          value={countValue}
          onChange={(e) => {
            if(+e.target.value > 0 && +e.target.value < 100) {
              dispatch(changeTotalPrice(-product.price * countValue));
              setCountValue(+e.target.value);
              dispatch(changeTotalPrice(product.price * +e.target.value));
            }
            if(+e.target.value > 99) {
              dispatch(changeTotalPrice(-product.price * countValue));
              setCountValue(99);
              dispatch(changeTotalPrice(product.price * +e.target.value));
            }
          }}
          aria-label="количество товара"
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={() => {
            if(countValue < 99) {
              setCountValue((prev) => prev + 1);
              dispatch(changeTotalPrice(product.price));
            }
          }}
          disabled={countValue === 99}
        >
          <svg width="7" height="12" aria-hidden="true">
            <use xlinkHref="#icon-arrow"></use>
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{(product.price * countValue).toLocaleString('ru-RU')} ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={() => dispatch(removeProductFromBasket(product.id))}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </li>
  );
}
