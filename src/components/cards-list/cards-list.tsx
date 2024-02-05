import { PRODUCTS_ON_PAGE_COUNT } from '../../consts';
import { useAppSelector } from '../../hooks';
import {
  getCurrentPage,
  getFilteredAndSortedProducts,
} from '../../store/app-process/app-process.selectors';
import { getIsProductsLoaded } from '../../store/data-process/data-process.selectors';
import ProductCard from '../product-card/product-card';

export default function CardsList() {
  const products = useAppSelector(getFilteredAndSortedProducts);
  const isProductsLoaded = useAppSelector(getIsProductsLoaded);
  const currentPage = useAppSelector(getCurrentPage);

  const productsOnPage =
    products.length > PRODUCTS_ON_PAGE_COUNT && currentPage !== null
      ? products.slice(
        currentPage * PRODUCTS_ON_PAGE_COUNT,
        currentPage * PRODUCTS_ON_PAGE_COUNT + PRODUCTS_ON_PAGE_COUNT
      )
      : products;

  if (!isProductsLoaded) {
    return (
      <div>
        <b>Загрузка...</b>
      </div>
    );
  } else {
    return (
      <div className="cards catalog__cards">
        {productsOnPage.length > 0 ? (
          productsOnPage.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <span>
            <b>По вашему запросу ничего не найдено</b>
          </span>
        )}
      </div>
    );
  }
}
