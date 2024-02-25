import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsModalAddReviewOpen, getIsModalAddToBasketOpen, getIsModalAddToBasketSuccessOpen, getIsModalNewReviewSuccess, getIsModalOpen, getIsModalOrderSendOpen } from '../../store/app-process/app-process.selectors';
import ModalAddReview from '../modal-add-review/modal-add-review';
import ModalAddToBasket from '../modal-add-to-basket/modal-add-to-basket';
import { closeAllModal } from '../../store/app-process/app-process.slice';
import ModalNewReviewSuccess from '../modal-new-review-success/modal-new-review-success';
import ModalAddToBasketSuccess from '../modal-add-basket-success/modal-add-to-basket-success';
import ModalSuccessBuy from '../modal-success-buy/modal-success-buy';

export default function Modal() {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(getIsModalOpen);
  const isModalAddToBasketOpen = useAppSelector(getIsModalAddToBasketOpen);
  const isModalAddReviewOpen = useAppSelector(getIsModalAddReviewOpen);
  const isModalNewReviewsSuccess = useAppSelector(getIsModalNewReviewSuccess);
  const isModalAddToBasketSuccessOpen = useAppSelector(getIsModalAddToBasketSuccessOpen);
  const isModalOrderSendOpen = useAppSelector(getIsModalOrderSendOpen);

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

  return (
    <div className={className}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => dispatch(closeAllModal())}></div>
        <div className="modal__content">
          {isModalAddToBasketOpen && <ModalAddToBasket />}
          {isModalAddReviewOpen && <ModalAddReview />}
          {isModalNewReviewsSuccess && <ModalNewReviewSuccess />}
          {isModalAddToBasketSuccessOpen && <ModalAddToBasketSuccess />}
          {isModalOrderSendOpen && <ModalSuccessBuy />}
        </div>
      </div>
    </div>
  );
}
