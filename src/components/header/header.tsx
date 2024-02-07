import { Link, useNavigate, useParams } from 'react-router-dom';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { getProducts } from '../../store/data-process/data-process.selectors';
import { useAppSelector } from '../../hooks';
import { AppRoutes } from '../../consts';

export default function Header() {
  const navigate = useNavigate();
  const products = useAppSelector(getProducts);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [searchValue, setSearchValue] = useState('');
  const { id } = useParams();

  useEffect(() => {
    setSearchValue('');
  }, [id]);

  useEffect(() => {
    if(listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [searchValue]);

  const relativeProducts = products.filter((product) =>
    product.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
  );

  const handleInputChange = () => {
    if (searchInputRef.current) {
      setSearchValue(searchInputRef.current.value);
    }
  };

  const handleArrowNavigation = (event: React.KeyboardEvent<HTMLLIElement>, index: number) => {
    const isArrowUp = event.key === 'ArrowUp';
    const isArrowDown = event.key === 'ArrowDown';

    if (listRef.current && (isArrowUp || isArrowDown)) {
      const listItems = listRef.current.querySelectorAll('.form-search__select-item');

      event.preventDefault();
      const nextIndex = isArrowUp ? index - 1 : index + 1;

      if (nextIndex >= 0 && nextIndex < listItems.length) {
        (listItems[nextIndex] as HTMLElement).focus();
      }
    }
  };

  const handleTest = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if(listRef.current && event.key === 'ArrowDown') {
      const listItems = listRef.current.querySelectorAll('.form-search__select-item');

      event.preventDefault();
      (listItems[0] as HTMLElement).focus();
    }
  };

  return (
    <header className="header" id="header">
      <div className="container">
        <Link className="header__logo" to="/" aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="main-nav__link" to="/">
                Каталог
              </Link>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Гарантии
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                Доставка
              </a>
            </li>
            <li className="main-nav__item">
              <a className="main-nav__link" href="#">
                О компании
              </a>
            </li>
          </ul>
        </nav>

        <div
          className={classNames('form-search', {
            'list-opened':
              searchValue.length > 2 && relativeProducts.length > 0,
          })}
        >
          <form>
            <label>
              <svg
                className="form-search__icon"
                width="16"
                height="16"
                aria-hidden="true"
              >
                <use xlinkHref="#icon-lens"></use>
              </svg>
              <input
                onChange={handleInputChange}
                className="form-search__input"
                type="text"
                autoComplete="off"
                placeholder="Поиск по сайту"
                ref={searchInputRef}
                value={searchValue}
                onKeyDown={(e) => handleTest(e)}
              />
            </label>
            <ul className="form-search__select-list" style={{}} ref={listRef}>
              {relativeProducts.map((product, index) => (
                <li
                  key={product.name}
                  className="form-search__select-item"
                  tabIndex={0}
                  onClick={() => navigate(`/${AppRoutes.Product}${product.id}/description`)}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                      navigate(`/${AppRoutes.Product}${product.id}/description`);
                    }
                    handleArrowNavigation(e, index);
                  }}
                >
                  {product.name}
                </li>
              ))}
            </ul>
          </form>
          <button
            className="form-search__reset"
            type="reset"
            onClick={() => {
              setSearchValue('');
              searchInputRef.current?.focus();
            }}
            style={{
              display: searchValue.length > 0 ? 'inline-block' : 'none',
            }}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
            <span className="visually-hidden">Сбросить поиск</span>
          </button>
        </div>

        <a className="header__basket-link" href="#">
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
        </a>
      </div>
    </header>
  );
}
