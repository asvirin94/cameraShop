import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeAllModal, removeProductFromBasket } from '../../store/app-process/app-process.slice';
import { getCurrentPage, getRemovingItemId } from '../../store/app-process/app-process.selectors';
import { getProducts } from '../../store/data-process/data-process.selectors';

export default function ModalRemoveItem() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const productId = useAppSelector(getRemovingItemId);
  const currentPage = useAppSelector(getCurrentPage);

  const product = products.find((item) => item.id === productId);

  if(product) {
    return (
      <>
        <p className="title title--h4">Удалить этот товар?</p>
        <div className="basket-item basket-item--short">
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
              <li className="basket-item__list-item">{`${product.type} ${product.category.toLocaleLowerCase()}`}</li>
              <li className="basket-item__list-item">{`${product.level} уровень`}</li>
            </ul>
          </div>
        </div>
        <div className="modal__buttons">
          <button
            onClick={() => {
              dispatch(removeProductFromBasket(product.id));
              dispatch(closeAllModal());
            }}
            className="btn btn--purple modal__btn modal__btn--half-width"
            type="button"
          >
            Удалить
          </button>
          <a
            className="btn btn--transparent modal__btn modal__btn--half-width"
            onClick={() => {
              dispatch(closeAllModal());
              navigate(`/?page=${currentPage}`);
            }}
          >
            Продолжить покупки
          </a>
        </div>
        <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => dispatch(closeAllModal())}>
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </>
    );
  } else {
    return null;
  }

}
