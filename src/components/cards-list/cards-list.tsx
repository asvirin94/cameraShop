import { useAppSelector } from '../../hooks';
import { getProducts } from '../../store/data-process/data-process.selectors';
import ProductCard from '../product-card/product-card';

export default function CardsList() {
  const products = useAppSelector(getProducts);

  return (
    <div className="cards catalog__cards">
      {products.map((product) => (
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
