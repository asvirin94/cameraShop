import { PRODUCTS_ON_PAGE_COUNT } from '../../consts';
import { useAppSelector } from '../../hooks';
import { getCurrentPage } from '../../store/app-process/app-process.selectors';
import { getProducts } from '../../store/data-process/data-process.selectors';
import { getSortDirection, getSortType } from '../../store/sort-process/sort-process.selectors';
import { getSortedProducts } from '../../utils';
import ProductCard from '../product-card/product-card';

export default function CardsList() {
  const products = useAppSelector(getProducts);
  const currentPage = useAppSelector(getCurrentPage);
  const sortType = useAppSelector(getSortType);
  const sortDirection = useAppSelector(getSortDirection);

  const sortedProducts = getSortedProducts(sortType, sortDirection, products);

  const productsOnPage = products.length > PRODUCTS_ON_PAGE_COUNT && currentPage !== null
    ? sortedProducts.slice(currentPage * PRODUCTS_ON_PAGE_COUNT, (currentPage * PRODUCTS_ON_PAGE_COUNT + PRODUCTS_ON_PAGE_COUNT))
    : sortedProducts;

  return (
    <div className="cards catalog__cards">
      {productsOnPage.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  );
}
