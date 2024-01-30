import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setCurrentPage } from '../../store/app-process/app-process.slice';
import { getProducts } from '../../store/data-process/data-process.selectors';
import {
  getFilterCategory,
  getFilterLevel,
  getFilterType,
} from '../../store/filter-process/filter-process.selectors';
import {
  resetFilters,
  setCategory,
  setLevel,
  setType,
} from '../../store/filter-process/filter-process.slice';
import {
  getSortType,
  getSortDirection,
} from '../../store/sort-process/sort-process.selectors';
import { useEffect } from 'react';

export default function Filter() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const products = useAppSelector(getProducts);
  const sortType = useAppSelector(getSortType);
  const sortDirection = useAppSelector(getSortDirection);
  const filterCategory = useAppSelector(getFilterCategory);
  const filterType = useAppSelector(getFilterType);
  const filterlevel = useAppSelector(getFilterLevel);

  useEffect(() => {
    navigate(
      `/?page=1${sortType ? `&sortType=${sortType}` : ''}${
        sortDirection ? `&sortDirection=${sortDirection}` : ''
      }${filterCategory ? `&filterCategory=${filterCategory}` : ''}${
        filterType.length > 0 ? `&filterType=${filterType.join(',')}` : ''
      }${filterlevel.length > 0 ? `&filterLevel=${filterlevel.join(',')}` : ''}`
    );
  }, [filterCategory, filterType, filterlevel]);

  const allProductsPrices = products.map((product) => product.price);

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
                    placeholder={`${Math.min(...allProductsPrices)}`}
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="priceUp"
                    placeholder={`${Math.max(...allProductsPrices)}`}
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
                  onClick={() => {
                    dispatch(setCategory('photo'));
                    dispatch(setCurrentPage(0));
                  }}
                  checked={filterCategory === 'photo'}
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
                  onClick={() => {
                    dispatch(setCategory('video'));
                    dispatch(setCurrentPage(0));
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
                  onClick={() => dispatch(setType('digital'))}
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
                  onClick={() => dispatch(setType('film'))}
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
                  onClick={() => dispatch(setType('snapshot'))}
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
                  onClick={() => dispatch(setType('collection'))}
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
                  onClick={() => dispatch(setLevel('zero'))}
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
                  onClick={() => dispatch(setLevel('non-professional'))}
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
                  onClick={() => dispatch(setLevel('professional'))}
                  checked={filterlevel.includes('professional')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Профессиональный</span>
              </label>
            </div>
          </fieldset>
          <button className="btn catalog-filter__reset-btn" type="reset" onClick={() => dispatch(resetFilters())}>
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}
