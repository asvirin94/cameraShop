import { useAppDispatch, useAppSelector } from '../../hooks';
import { getProductToAdd } from '../../store/app-process/app-process.selectors';
import { closeAllModal } from '../../store/app-process/app-process.slice';

export default function ModalAddToBusket() {
  const dispatch = useAppDispatch();
  const product = useAppSelector(getProductToAdd);

  return (
    <>
      <p className="title title--h4">Добавить товар в корзину</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`/${product?.previewImgWebp as string}, /${product?.previewImgWebp2x as string}`}
            />
            <img
              src={product?.previewImg}
              srcSet={product?.previewImg2x}
              width="140"
              height="120"
              alt={product?.name}
            />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{product?.name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул:</span>{' '}
              <span className="basket-item__number">{product?.vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{`${product?.type as string} ${product?.category.toLowerCase() as string}`}</li>
            <li className="basket-item__list-item">{product?.level} уровень</li>
          </ul>
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>{product?.price.toLocaleString('ru-RU')} ₽
          </p>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
        >
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>
          Добавить в корзину
        </button>
      </div>
      <button className="cross-btn" onClick={() => dispatch(closeAllModal())} type="button" aria-label="Закрыть попап">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </>
  );
}
