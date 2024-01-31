import { useEffect} from 'react';
import { PRODUCTS_ON_PAGE_COUNT } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage } from '../../store/app-process/app-process.selectors';
import { getIsProductsLoaded, getProducts } from '../../store/data-process/data-process.selectors';
import {
  getFilterCategory,
  getFilterLevel,
  getFilterType,
  getMaxPrice,
  getMinPrice,
} from '../../store/filter-process/filter-process.selectors';
import {
  getSortDirection,
  getSortType,
} from '../../store/sort-process/sort-process.selectors';
import { getFilteredProducts, getSortedProducts } from '../../utils';
import ProductCard from '../product-card/product-card';
import { setFilteredAndSortedProducts } from '../../store/app-process/app-process.slice';

export default function CardsList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const isProductsLoaded = useAppSelector(getIsProductsLoaded);
  const currentPage = useAppSelector(getCurrentPage);
  const sortType = useAppSelector(getSortType);
  const sortDirection = useAppSelector(getSortDirection);
  const filterCategory = useAppSelector(getFilterCategory);
  const filterType = useAppSelector(getFilterType);
  const filterlevel = useAppSelector(getFilterLevel);
  const minPrice = useAppSelector(getMinPrice);
  const maxPrice = useAppSelector(getMaxPrice);

  const filteredProducts = getFilteredProducts(
    filterCategory,
    filterType,
    filterlevel,
    minPrice,
    maxPrice,
    products
  );

  const sortedProducts = getSortedProducts(
    sortType,
    sortDirection,
    filteredProducts
  );

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      dispatch(setFilteredAndSortedProducts(filteredProducts));
    }

    return () => {
      isMounted = false;
    };
  }, [filteredProducts]);

  const productsOnPage =
    products.length > PRODUCTS_ON_PAGE_COUNT && currentPage !== null
      ? sortedProducts.slice(
        currentPage * PRODUCTS_ON_PAGE_COUNT,
        currentPage * PRODUCTS_ON_PAGE_COUNT + PRODUCTS_ON_PAGE_COUNT
      )
      : sortedProducts;

  if(!isProductsLoaded) {
    return <div><b>Загрузка...</b></div>;
  }

  return (
    <div className="cards catalog__cards">
      {productsOnPage.length > 0 ? productsOnPage.map((product) => (
        <ProductCard key={product.id} product={product} />
      )) : <span><b>По вашему запросу ничего не найдено</b></span>}
    </div>
  );
}
