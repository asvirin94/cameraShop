import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { closeAllModal } from '../../store/app-process/app-process.slice';
import { AppRoutes } from '../../consts';

export default function ModalAddToBasketSuccess() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <>
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width="86" height="80" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>
      <div className="modal__buttons">
        <a className="btn btn--transparent modal__btn" onClick={() => dispatch(closeAllModal())}>
          Продолжить покупки
        </a>
        <button className="btn btn--purple modal__btn modal__btn--fit-width" onClick={() => {
          dispatch(closeAllModal());
          navigate(`/${AppRoutes.Basket}`);
          window.scrollTo({
            top: 0
          });
        }}
        >
          Перейти в корзину
        </button>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап" onClick={() => dispatch(closeAllModal())}>
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </>
  );
}
