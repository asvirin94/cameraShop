import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  getSortDirection,
  getSortType,
} from '../../store/sort-process/sort-process.selectors';
import { useNavigate } from 'react-router-dom';
import { setSortDirection, setSortType } from '../../store/sort-process/sort-process.slice';
import { getFilterCategory, getFilterType, getFilterLevel, getMaxPrice, getMinPrice } from '../../store/filter-process/filter-process.selectors';
import { useEffect } from 'react';
import { getCurrentPage } from '../../store/app-process/app-process.selectors';

export default function Sorts() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const page = useAppSelector(getCurrentPage);
  const sortType = useAppSelector(getSortType);
  const sortDirection = useAppSelector(getSortDirection);
  const filterCategory = useAppSelector(getFilterCategory);
  const filterType = useAppSelector(getFilterType);
  const filterlevel = useAppSelector(getFilterLevel);
  const minPrice = useAppSelector(getMinPrice);
  const maxPrice = useAppSelector(getMaxPrice);

  useEffect(() => {
    navigate(
      `/?page=${page + 1}${sortType ? `&sortType=${sortType}` : ''}${
        sortDirection ? `&sortDirection=${sortDirection}` : ''
      }${filterCategory ? `&filterCategory=${filterCategory}` : ''}${
        filterType.length > 0 ? `&filterType=${filterType.join(',')}` : ''
      }${filterlevel.length > 0 ? `&filterLevel=${filterlevel.join(',')}` : ''}${
        minPrice ? `&minPrice=${minPrice}` : ''
      }${maxPrice ? `&maxPrice=${maxPrice}` : ''}`
    );
  }, [page, sortDirection, sortType]);

  const sortDirectionHandler = (direction: string) => {
    if(!sortType) {
      dispatch(setSortType('price'));
    }
    dispatch(setSortDirection(direction));
  };

  const sortTypeHandler = (type: string) => {
    if(!sortDirection) {
      dispatch(setSortDirection('fromLowToHigh'));
    }
    dispatch(setSortType(type));
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
