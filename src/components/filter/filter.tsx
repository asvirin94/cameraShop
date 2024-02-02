import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentPage } from '../../store/app-process/app-process.slice';
import {
  getFilterCategory,
  getFilterLevel,
  getFilterType,
  getMaxPrice,
  getMinPrice,
} from '../../store/filter-process/filter-process.selectors';
import {
  resetFilters,
  setCategory,
  setLevel,
  setMaxPrice,
  setMinPrice,
  setType,
} from '../../store/filter-process/filter-process.slice';
import {
  getSortType,
  getSortDirection,
} from '../../store/sort-process/sort-process.selectors';
import { useEffect } from 'react';
import { getCurrentPage, getFilteredAndSortedProducts } from '../../store/app-process/app-process.selectors';

export default function Filter() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const filteredProducts = useAppSelector(getFilteredAndSortedProducts);
  const sortType = useAppSelector(getSortType);
  const page = useAppSelector(getCurrentPage);
  const sortDirection = useAppSelector(getSortDirection);
  const filterCategory = useAppSelector(getFilterCategory);
  const filterType = useAppSelector(getFilterType);
  const filterlevel = useAppSelector(getFilterLevel);
  const minPrice = useAppSelector(getMinPrice);
  const maxPrice = useAppSelector(getMaxPrice);

  const filteredProductsPrices = filteredProducts.map((product) => product.price);

  useEffect(() => {
    navigate(
      `/?page=${page + 1}${sortType ? `&sortType=${sortType}` : ''}${
        sortDirection ? `&sortDirection=${sortDirection}` : ''
      }${filterCategory ? `&filterCategory=${filterCategory}` : ''}${
        filterType.length > 0 ? `&filterType=${filterType.join(',')}` : ''
      }${
        filterlevel.length > 0 ? `&filterLevel=${filterlevel.join(',')}` : ''
      }${minPrice ? `&minPrice=${minPrice}` : ''}${
        maxPrice ? `&maxPrice=${maxPrice}` : ''
      }`
    );
  }, [page, filterCategory, filterType, filterlevel, minPrice, maxPrice]);

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="price"
                    placeholder={
                      filteredProducts.length > 0
                        ? `${Math.min(...filteredProductsPrices)}`
                        : '0'
                    }
                    onKeyDown={(e) => {
                      if (e.key === '-') {
                        e.preventDefault();
                      }
                    }}
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="priceUp"
                    placeholder={
                      filteredProducts.length > 0
                        ? `${Math.max(...filteredProductsPrices)}`
                        : '0'
                    }
                    onKeyDown={(e) => {
                      if (e.key === '-') {
                        e.preventDefault();
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="photocamera"
                  onChange={() => {
                    dispatch(setCategory('photo'));
                    dispatch(setCurrentPage(0));
                  }}
                  checked={filterCategory === 'photo'}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                      dispatch(setCategory('photo'));
                      dispatch(setCurrentPage(0));
                    }
                  }}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Фотокамера</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="videocamera"
                  onChange={() => {
                    dispatch(setCategory('video'));
                    dispatch(setCurrentPage(0));
                  }}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                      dispatch(setCategory('video'));
                      dispatch(setCurrentPage(0));
                    }
                  }}
                  checked={filterCategory === 'video'}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Видеокамера</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="digital"
                  onChange={() => dispatch(setType('digital'))}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                      dispatch(setType('digital'));
                    }
                  }}
                  checked={filterType.includes('digital')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="film"
                  disabled={filterCategory === 'video'}
                  onChange={() => dispatch(setType('film'))}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                      dispatch(setType('film'));
                    }
                  }}
                  checked={filterType.includes('film')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Плёночная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="snapshot"
                  disabled={filterCategory === 'video'}
                  onChange={() => dispatch(setType('snapshot'))}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                      dispatch(setType('snapshot'));
                    }
                  }}
                  checked={filterType.includes('snapshot')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Моментальная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="collection"
                  onChange={() => dispatch(setType('collection'))}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                      dispatch(setType('collection'));
                    }
                  }}
                  checked={filterType.includes('collection')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Коллекционная</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="zero"
                  onChange={() => dispatch(setLevel('zero'))}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                      dispatch(setLevel('zero'));
                    }
                  }}
                  checked={filterlevel.includes('zero')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="non-professional"
                  onChange={() => dispatch(setLevel('non-professional'))}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                      dispatch(setLevel('non-professional'));
                    }
                  }}
                  checked={filterlevel.includes('non-professional')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Любительский</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name="professional"
                  onChange={() => dispatch(setLevel('professional'))}
                  onKeyDown={(e) => {
                    if(e.key === 'Enter') {
                      dispatch(setLevel('professional'));
                    }
                  }}
                  checked={filterlevel.includes('professional')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Профессиональный</span>
              </label>
            </div>
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={() => dispatch(resetFilters())}
            onKeyDown={(e) => {
              if(e.key === 'Enter') {
                dispatch(resetFilters());
              }
            }}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}
