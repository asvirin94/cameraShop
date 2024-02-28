import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsModalAddReviewOpen, getIsModalAddToBasketOpen, getIsModalAddToBasketSuccessOpen, getIsModalNewReviewSuccess, getIsModalOpen, getIsModalOrderSendOpen, getIsModalRemoveItemOpen } from '../../store/app-process/app-process.selectors';
import ModalAddReview from '../modal-add-review/modal-add-review';
import ModalAddToBasket from '../modal-add-to-basket/modal-add-to-basket';
import { closeAllModal } from '../../store/app-process/app-process.slice';
import ModalNewReviewSuccess from '../modal-new-review-success/modal-new-review-success';
import ModalAddToBasketSuccess from '../modal-add-basket-success/modal-add-to-basket-success';
import ModalSuccessBuy from '../modal-success-buy/modal-success-buy';
import ModalRemoveItem from '../modal-remove-item/modal-remove-item';

export default function Modal() {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(getIsModalOpen);
  const isModalAddToBasketOpen = useAppSelector(getIsModalAddToBasketOpen);
  const isModalAddReviewOpen = useAppSelector(getIsModalAddReviewOpen);
  const isModalNewReviewsSuccess = useAppSelector(getIsModalNewReviewSuccess);
  const isModalAddToBasketSuccessOpen = useAppSelector(getIsModalAddToBasketSuccessOpen);
  const isModalOrderSendOpen = useAppSelector(getIsModalOrderSendOpen);
  const isModalRemoveItemOpen = useAppSelector(getIsModalRemoveItemOpen);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isModalOpen) {
        event.preventDefault();
        dispatch(closeAllModal());
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      const activeElement = document.activeElement as HTMLElement | null;
      if(activeElement) {
        activeElement.blur();
      }
    };
  }, [isModalOpen]);

  useEffect(() => {
    if(isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const className = isModalOpen ? 'modal is-active' : 'modal';
  const classNameIsNarrow = isModalAddToBasketSuccessOpen ? 'modal--narrow' : '';

  return (
    <div className={`${className} ${classNameIsNarrow}`}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => dispatch(closeAllModal())}></div>
        <div className="modal__content">
          {isModalAddToBasketOpen && <ModalAddToBasket />}
          {isModalAddReviewOpen && <ModalAddReview />}
          {isModalNewReviewsSuccess && <ModalNewReviewSuccess />}
          {isModalAddToBasketSuccessOpen && <ModalAddToBasketSuccess />}
          {isModalOrderSendOpen && <ModalSuccessBuy />}
          {isModalRemoveItemOpen && <ModalRemoveItem />}
        </div>
      </div>
    </div>
  );
}
