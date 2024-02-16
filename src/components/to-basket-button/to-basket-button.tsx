import { Link } from 'react-router-dom';
import { AppRoutes } from '../../consts';

export default function ToBasketButton() {
  return (
    <Link className="btn btn--purple-border" to={`/${AppRoutes.Basket}`} onClick={() => window.scrollTo({top: 0})}>
      <svg width="16" height="16" aria-hidden="true">
        <use xlinkHref="#icon-basket"></use>
      </svg>В корзине
    </Link>
  );
}
