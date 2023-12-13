type ProductCardProps = {
  name: string;
  price: number;
  previewImg: string;
  previewImg2x: string;
  rating: number;
  reviewCount: number;
}

export default function ProductCard({name, price, previewImg, previewImg2x, rating, reviewCount}: ProductCardProps) {

  const getRatingStars = () => {
    const result = [];

    for(let i = 1; i <= 5; i++) {
      const starType = rating >= i ? '#icon-full-star' : '#icon-star';

      result.push(
        <svg width="17" height="16" aria-hidden="true">
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
            srcSet= {`${previewImg}, ${previewImg2x}`}
          />
          <img
            src="img/content/das-auge.jpg"
            srcSet="img/content/das-auge@2x.jpg 2x"
            width="280"
            height="240"
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          {getRatingStars()}
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>{reviewCount}
          </p>
        </div>
        <p className="product-card__title">
          {name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
        >
                            Купить
        </button>
        <a className="btn btn--transparent" href="#">Подробнее </a>
      </div>
    </div>
  );
}
