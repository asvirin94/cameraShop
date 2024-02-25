import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getErrorMessage,
  getIsOrderSend,
} from '../../store/data-process/data-process.selectors';
import { closeAllModal } from '../../store/app-process/app-process.slice';

export default function ModalSuccessBuy() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isOrderSend = useAppSelector(getIsOrderSend);
  const errorMessage = useAppSelector(getErrorMessage);

  return (
    <>
      <p className="title title--h4">
        {isOrderSend ? 'Спасибо за покупку' : errorMessage}
      </p>
      {isOrderSend && (
        <svg className="modal__icon" width="80" height="78" aria-hidden="true">
          <use xlinkHref="#icon-review-success"></use>
        </svg>
      )}
      <div className="modal__buttons">
        {isOrderSend && (
          <button
            className="btn btn--purple modal__btn modal__btn--fit-width"
            type="button"
            onClick={() => {
              navigate('/');
              dispatch(closeAllModal());
            }}
          >
            Вернуться к покупкам
          </button>
        )}
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={() => dispatch(closeAllModal())}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </>
  );
}
