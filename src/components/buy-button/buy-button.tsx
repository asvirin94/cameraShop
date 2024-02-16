import { useAppDispatch } from '../../hooks';
import { setModalIsOpen, setisModalAddToBasketOpen, setproductToAdd } from '../../store/app-process/app-process.slice';
import { ProductType } from '../../types/types';

type Props = {
  product: ProductType;
}

export default function BuyButton({product}: Props) {
  const dispatch = useAppDispatch();
  return (
    <button
      className="btn btn--purple product-card__btn"
      type="button"
      onClick={() => {
        dispatch(setModalIsOpen(true));
        dispatch(setisModalAddToBasketOpen(true));
        dispatch(setproductToAdd(product));
      }}
    >
          Купить
    </button>
  );
}
