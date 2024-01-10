import { PRODUCTS_ON_PAGE_COUNT } from '../../consts';
import { useAppSelector } from '../../hooks';
import { getCurrentPage } from '../../store/app-process/app-process.selectors';
import { getProducts } from '../../store/data-process/data-process.selectors';
import ProductCard from '../product-card/product-card';

export default function CardsList() {
  const products = useAppSelector(getProducts);
  const currentPage = useAppSelector(getCurrentPage);

  const productsOnPage = products.length > 9 && currentPage !== null
    ? products.slice(currentPage * PRODUCTS_ON_PAGE_COUNT, (currentPage * PRODUCTS_ON_PAGE_COUNT + PRODUCTS_ON_PAGE_COUNT))
    : products;

  return (
    <div className="cards catalog__cards">
      {productsOnPage.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  );
}
