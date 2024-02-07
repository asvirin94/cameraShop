import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import {
  setCurrentPage,
  setFilteredAndSortedProducts,
} from '../../store/app-process/app-process.slice';
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
import { useEffect, useMemo, useRef } from 'react';
import {
  getCurrentPage, getFilteredAndSortedProducts,
} from '../../store/app-process/app-process.selectors';
import { getProducts } from '../../store/data-process/data-process.selectors';
import { makeFiltrationAndSorting } from '../../utils';
import { useDebouncedCallback } from 'use-debounce';
import { DEBOUNCE_DELAY } from '../../consts';

export default function Filter() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const debouncedMaxPriceChange = useDebouncedCallback((e: string | undefined) => dispatch(setMaxPrice(e)), DEBOUNCE_DELAY);
  const debouncedMinPriceChange = useDebouncedCallback((e: string | undefined) => dispatch(setMinPrice(e)), DEBOUNCE_DELAY);
  const products = useAppSelector(getProducts);
  const filteredAndSortedProducts = useAppSelector(getFilteredAndSortedProducts);
  const sortType = useAppSelector(getSortType);
  const page = useAppSelector(getCurrentPage);
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
      }${
        filterlevel.length > 0 ? `&filterLevel=${filterlevel.join(',')}` : ''
      }${minPrice ? `&minPrice=${minPrice}` : ''}${
        maxPrice ? `&maxPrice=${maxPrice}` : ''
      }`
    );
  }, [page, filterCategory, filterType, filterlevel, minPrice, maxPrice]);

  const filteredProducts = useMemo(
    () =>
      makeFiltrationAndSorting(
        products,
        filterCategory,
        filterType,
        filterlevel,
        minPrice,
        maxPrice,
        sortType,
        sortDirection,
      ),
    [filterCategory, filterType, filterlevel, minPrice, maxPrice, sortType, sortDirection, products]
  );

  const filteredPrices = useMemo(() => filteredAndSortedProducts.map((prod) => prod.price), [filteredAndSortedProducts]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(setFilteredAndSortedProducts(filteredProducts));
    }

    return () => {
      isMounted = false;
    };
  }, [filteredProducts]);

  const minInputRef = useRef<HTMLInputElement>(null);
  const maxInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if(minInputRef.current && minPrice) {
      minInputRef.current.value = minPrice;
    }
    if(minInputRef.current && !minPrice) {
      minInputRef.current.value = '';
    }
  }, [minPrice]);

  useEffect(() => {
    if(maxInputRef.current && maxPrice) {
      if(!!minPrice && +minPrice > +maxPrice) {
        maxInputRef.current.value = minPrice;
        dispatch(setMaxPrice(minPrice));
      } else {
        maxInputRef.current.value = maxPrice;
      }
    }
    if(maxInputRef.current && !maxPrice) {
      maxInputRef.current.value = '';
    }
  }, [maxPrice, minPrice]);

  useEffect(() => {
    if(minInputRef.current && minInputRef.current.value.length) {
      const filteredProductsWithoutPriceFilter = makeFiltrationAndSorting(products, filterCategory, filterType, filterlevel);
      const filteredPricesWithoutPriceFilter = filteredProductsWithoutPriceFilter.map((prod) => prod.price);
      const currentMinFilteredPrice = filteredPricesWithoutPriceFilter.length ? Math.min(...filteredPricesWithoutPriceFilter) : 0;

      if(+minInputRef.current.value < currentMinFilteredPrice && !!minPrice) {
        dispatch(setMinPrice(currentMinFilteredPrice.toString()));
        minInputRef.current.value = currentMinFilteredPrice.toString();
      }
    }
  }, [filteredAndSortedProducts, minInputRef.current?.value]);

  useEffect(() => {
    if(maxInputRef.current && maxInputRef.current.value.length) {
      const filteredProductsWithoutPriceFilter = makeFiltrationAndSorting(products, filterCategory, filterType, filterlevel);
      const filteredPricesWithoutPriceFilter = filteredProductsWithoutPriceFilter.map((prod) => prod.price);
      const currentMaxFilteredPrice = filteredPricesWithoutPriceFilter.length ? Math.max(...filteredPricesWithoutPriceFilter) : Infinity;

      if(+maxInputRef.current.value > currentMaxFilteredPrice && maxPrice) {
        dispatch(setMaxPrice(currentMaxFilteredPrice.toString()));
        maxInputRef.current.value = currentMaxFilteredPrice.toString();
      }
    }
  }, [filteredAndSortedProducts]);

  const handleMinPriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length) {
      debouncedMinPriceChange(e.target.value);
    } else{
      debouncedMinPriceChange(undefined);
    }
  };

  const handleMaxPriceInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length) {
      debouncedMaxPriceChange(e.target.value);
    } else {
      debouncedMaxPriceChange(undefined);
    }
  };

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
                    placeholder={filteredAndSortedProducts.length ? Math.min(...filteredPrices).toString() : '0'}
                    onKeyDown={(e) => {
                      if (e.key === '-') {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => handleMinPriceInputChange(e)}
                    ref={minInputRef}
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number"
                    name="priceUp"
                    placeholder={filteredAndSortedProducts.length ? Math.max(...filteredPrices).toString() : '0'}
                    onKeyDown={(e) => {
                      if (e.key === '-') {
                        e.preventDefault();
                      }
                    }}
                    onChange={(e) => handleMaxPriceInputChange(e)}
                    ref={maxInputRef}
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
                    if (e.key === 'Enter') {
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
                    if(filterType.includes('film')) {
                      dispatch(setType('film'));
                    }
                    if(filterType.includes('snapshot')) {
                      dispatch(setType('snapshot'));
                    }
                    dispatch(setCategory('video'));
                    dispatch(setCurrentPage(0));
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      if(filterType.includes('film')) {
                        dispatch(setType('film'));
                      }
                      if(filterType.includes('snapshot')) {
                        dispatch(setType('snapshot'));
                      }
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
                    if (e.key === 'Enter') {
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
                    if (e.key === 'Enter') {
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
                    if (e.key === 'Enter') {
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
                    if (e.key === 'Enter') {
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
                    if (e.key === 'Enter') {
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
                    if (e.key === 'Enter') {
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
                    if (e.key === 'Enter') {
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
              if (e.key === 'Enter') {
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
