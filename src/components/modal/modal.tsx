import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getIsModalAddReviewOpen, getIsModalAddToBusketOpen, getIsModalOpen } from '../../store/app-process/app-process.selectors';
import ModalAddReview from '../modal-add-review/modal-add-review';
import ModalAddToBusket from '../modal-add-to-busket/modal-add-to-busket';
import { closeAllModal } from '../../store/app-process/app-process.slice';

export default function Modal() {
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(getIsModalOpen);
  const isModalAddToBusketOpen = useAppSelector(getIsModalAddToBusketOpen);
  const isModalAddReviewOpen = useAppSelector(getIsModalAddReviewOpen);

  useEffect(() => {
    if(isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

  }, [isModalOpen]);

  const className = isModalOpen ? 'modal is-active' : 'modal';

  return (
    <div className={className}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => dispatch(closeAllModal())}></div>
        <div className="modal__content">
          {isModalAddToBusketOpen && <ModalAddToBusket />}
          {isModalAddReviewOpen && <ModalAddReview />}
        </div>
      </div>
    </div>
  );
}
