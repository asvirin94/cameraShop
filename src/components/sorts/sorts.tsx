import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage } from '../../store/app-process/app-process.selectors';
import {
  getSortDirection,
  getSortType,
} from '../../store/sort-process/sort-process.selectors';
import { useNavigate } from 'react-router-dom';
import { setSortDirection, setSortType } from '../../store/sort-process/sort-process.slice';

export default function Sorts() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPage = useAppSelector(getCurrentPage);
  const sortType = useAppSelector(getSortType);
  const sortDirection = useAppSelector(getSortDirection);

  const sortDirectionHandler = (direction: string) => {
    if(!sortType) {
      dispatch(setSortType('price'));
    }
    dispatch(setSortDirection(direction));
    navigate(`/?page=${currentPage + 1}&sortType=${sortType ? sortType : 'price'}&sortDirection=${direction}`);
  };

  const sortTypeHandler = (type: string) => {
    if(!sortDirection) {
      dispatch(setSortDirection('fromLowToHigh'));
    }
    dispatch(setSortType(type));
    navigate(`/?page=${currentPage + 1}&sortType=${type}&sortDirection=${sortDirection ? sortDirection : 'fromLowToHigh'}`);
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                onChange={() => sortTypeHandler('price')}
                type="radio"
                id="sortPrice"
                name="sort"
                checked={sortType === 'price'}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>
            <div className="catalog-sort__btn-text">
              <input
                onChange={() => sortTypeHandler('popularity')}
                type="radio"
                id="sortPopular"
                name="sort"
                checked={sortType === 'popularity'}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>
          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                onChange={() => sortDirectionHandler('fromLowToHigh')}
                checked={sortDirection === 'fromLowToHigh'}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={sortDirection === 'fromHighToLow'}
                onChange={() => sortDirectionHandler('fromHighToLow')}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
