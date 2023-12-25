import { Link } from 'react-router-dom';
import { STARS_COUNT } from '../../consts';
import { useAppDispatch } from '../../hooks';
import { setproductToAdd, setModalIsOpen, setisModalAddToBusketOpen } from '../../store/app-process/app-process.slice';
import { ProductType } from '../../types/types';

type Props = {
  product: ProductType;
}

export default function ProductCard(props: Props) {
  const dispatch = useAppDispatch();
  const {product} = props;

  const getRatingStars = () => {
    const result = [];

    for(let i = 1; i <= STARS_COUNT; i++) {
      const starType = product.rating >= i ? '#icon-full-star' : '#icon-star';

      result.push(
        <svg width="17" height="16" aria-hidden="true" key={i}>
          <use xlinkHref={starType}></use>
        </svg>
      );
    }

    return result;
  };

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
          {getRatingStars()}
          <p className="visually-hidden">Рейтинг: {product.rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{product.reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {product.name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{product.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={() => {
            dispatch(setModalIsOpen(true));
            dispatch(setisModalAddToBusketOpen(true));
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
