import { useAppDispatch } from '../../hooks';
import { closeAllModal } from '../../store/app-process/app-process.slice';

export default function ModalNewReviewSuccess() {
  const dispatch = useAppDispatch();

  return(
    <>
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <button onClick={() => dispatch(closeAllModal())} className="btn btn--purple modal__btn modal__btn--fit-width" type="button">Вернуться к покупкам
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
