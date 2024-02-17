import { useAppSelector } from '../../hooks';
import { getProductsInBasketData } from '../../store/app-process/app-process.selectors';

export default function BasketCounter() {
  const basketData = useAppSelector(getProductsInBasketData);

  const productsInBasketCount = basketData.reduce((sum, item) => sum + item.count, 0);

  if(productsInBasketCount) {
    return (
      <span className="header__basket-count">{productsInBasketCount}</span>
    );
  } else{
    return null;
  }
}
