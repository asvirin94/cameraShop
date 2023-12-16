import { useParams } from 'react-router-dom';
import { PRODUCTS_ON_PAGE_COUNT } from '../../consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCurrentPage } from '../../store/app-process/app-process.selectors';
import { getProducts } from '../../store/data-process/data-process.selectors';
import ProductCard from '../product-card/product-card';
import { useEffect } from 'react';
import { setCurrentPage } from '../../store/app-process/app-process.slice';

export default function CardsList() {
  const dispatch = useAppDispatch();
  const products = useAppSelector(getProducts);
  const currentPage = useAppSelector(getCurrentPage);

  const param = useParams().page;
  const page = param
    ? +param - 1
    : currentPage;

  useEffect(() => {
    if(page !== currentPage) {
      dispatch(setCurrentPage(page));
    }
  }, []);

  const productsOnPage = products.length > 9 && currentPage !== null
    ? products.slice(page * PRODUCTS_ON_PAGE_COUNT, (page * PRODUCTS_ON_PAGE_COUNT + PRODUCTS_ON_PAGE_COUNT))
    : products;

  return (
    <div className="cards catalog__cards">
      {productsOnPage.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          previewImg={product.previewImg}
          previewImg2x={product.previewImg2x}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
      ))}
    </div>
  );
}
