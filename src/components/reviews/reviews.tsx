import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getReviews } from '../../store/data-process/data-process.selectors';
import { loadReviewsAction } from '../../store/api-actions';
import * as dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { VISIBLE_REVIEWS_PER_CLICK } from '../../consts';
import { setIsModalAddReviewOpen, setModalIsOpen } from '../../store/app-process/app-process.slice';
import { getproductOnPage } from '../../store/app-process/app-process.selectors';
import RatingStars from '../rating-stars/rating-stars';

export default function Reviews() {
  const dispatch = useAppDispatch();
  const reviews = useAppSelector(getReviews);
  const id = useAppSelector(getproductOnPage)?.id;

  const [currentReviewSector, setCurrentReviewSector] = useState(0);

  dayjs.locale('ru');

  useEffect(() => {
    let isMount = true;

    if (isMount && id) {
      dispatch(loadReviewsAction(id));
    }

    return () => {
      isMount = false;
    };
  }, [id]);

  if (reviews) {
    const sortedReviews = [...reviews].sort((a, b) => {
      const dateA = dayjs(a.createAt);
      const dateB = dayjs(b.createAt);
      const diff = dateB.diff(dateA);

      return diff;
    });

    return (
      <div className="page-content__section">
        <section className="review-block">
          <div className="container">
            <div className="page-content__headed">
              <h2 className="title title--h3">Отзывы</h2>
              <button className="btn" type="button" onClick={() => {
                dispatch(setModalIsOpen(true));
                dispatch(setIsModalAddReviewOpen(true));
              }}
              >
                Оставить свой отзыв
              </button>
            </div>
            <ul className="review-block__list">
              {sortedReviews
                .slice(
                  0,
                  Math.min(
                    currentReviewSector * VISIBLE_REVIEWS_PER_CLICK +
                      VISIBLE_REVIEWS_PER_CLICK,
                    reviews.length
                  )
                )
                .map((review) => (
                  <li key={review.id} className="review-card">
                    <div className="review-card__head">
                      <p className="title title--h4">{review.userName}</p>
                      <time
                        className="review-card__data"
                        dateTime={dayjs(review.createAt).format('YYYY-MM-DD')}
                      >
                        {dayjs(review.createAt).format('DD MMMM')}
                      </time>
                    </div>
                    <div className="rate review-card__rate">
                      <RatingStars rating={review.rating}/>
                      <p className="visually-hidden">Оценка: {review.rating}</p>
                    </div>
                    <ul className="review-card__list">
                      <li className="item-list">
                        <span className="item-list__title">Достоинства:</span>
                        <p className="item-list__text">{review.advantage}</p>
                      </li>
                      <li className="item-list">
                        <span className="item-list__title">Недостатки:</span>
                        <p className="item-list__text">{review.disadvantage}</p>
                      </li>
                      <li className="item-list">
                        <span className="item-list__title">Комментарий:</span>
                        <p className="item-list__text">{review.review}</p>
                      </li>
                    </ul>
                  </li>
                ))}
            </ul>
            <div className="review-block__buttons">
              {(currentReviewSector + 1) * VISIBLE_REVIEWS_PER_CLICK <
                reviews.length && (
                <button
                  className="btn btn--purple"
                  type="button"
                  onClick={() => setCurrentReviewSector((prev) => prev + 1)}
                >
                  Показать больше отзывов
                </button>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  } else {
    return null;
  }
}
