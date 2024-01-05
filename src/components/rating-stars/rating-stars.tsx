import { STARS_COUNT } from '../../consts';

type Props = {
  rating: number;
}

export default function RatingStars({rating}: Props) {
  const result = [];

  for (let i = 1; i <= STARS_COUNT; i++) {
    const starType = rating >= i ? '#icon-full-star' : '#icon-star';

    result.push(
      <svg width="17" height="16" aria-hidden="true" key={i}>
        <use xlinkHref={starType}></use>
      </svg>
    );
  }

  return result;
}
