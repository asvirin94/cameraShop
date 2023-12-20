import { useAppSelector } from '../../hooks';
import { getIsModalAddToBusketOpen, getIsModalOpen } from '../../store/app-process/app-process.selectors';
import ModalAddToBusket from '../modal-add-to-busket/modal-add-to-busket';

export default function Modal() {
  const isModalOpen = useAppSelector(getIsModalOpen);
  const isModalAddToBusketOpen = useAppSelector(getIsModalAddToBusketOpen);

  const className = isModalOpen ? 'modal is-active' : 'modal';

  return (
    <div className={className}>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          {isModalAddToBusketOpen && <ModalAddToBusket />}
        </div>
      </div>
    </div>
  );
}
