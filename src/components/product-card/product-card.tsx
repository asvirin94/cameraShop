import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { setproductToAdd, setModalIsOpen, setisModalAddToBasketOpen } from '../../store/app-process/app-process.slice';
import { ProductType } from '../../types/types';
import RatingStars from '../rating-stars/rating-stars';

type Props = {
  product: ProductType;
}

export default function ProductCard(props: Props) {
  const dispatch = useAppDispatch();
  const {product} = props;

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet= {`${product.previewImg}, ${product.previewImg2x}`}
          />
          <img
            src="img/content/das-auge.jpg"
            srcSet="img/content/das-auge@2x.jpg 2x"
            width="280"
            height="240"
            alt={product.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingStars rating={product.rating}/>
          <p className="visually-hidden">Рейтинг: {product.rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{product.reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {product.name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{product.price.toLocaleString('ru-RU')} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={() => {
            dispatch(setModalIsOpen(true));
            dispatch(setisModalAddToBasketOpen(true));
            dispatch(setproductToAdd(product));
          }}
        >
          Купить
        </button>
        <Link className="btn btn--transparent" to={`/product/${product.id}/description`} onClick={() => window.scrollTo({top: 0})}>Подробнее </Link>
      </div>
    </div>
  );
}
