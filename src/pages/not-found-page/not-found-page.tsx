import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <Link
        className="header__logo"
        to='/'
        aria-label="Переход на главную"
      >
        <svg width="100" height="36" aria-hidden="true">
          <use xlinkHref="#icon-logo"></use>
        </svg>
      </Link>
      <p>404 not found</p>
    </div>
  );
}
