import { useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeAllModal } from '../../store/app-process/app-process.slice';
import { NewReview } from '../../types/types';
import { getIsModalAddReviewOpen, getproductOnPage } from '../../store/app-process/app-process.selectors';

export default function ModalAddReview() {
  const dispatch = useAppDispatch();
  const productId = useAppSelector(getproductOnPage)?.id;
  const isModalOpen = useAppSelector(getIsModalAddReviewOpen);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if(isModalOpen) {
      setTimeout(() => {
        if(firstInputRef.current) {
          firstInputRef.current.focus();
        }
      }, 10);
    }
  }, [isModalOpen]);

  const [review, setReview] = useState<NewReview>({
    cameraId: productId,
    userName: '',
    advantage: '',
    disadvantage: '',
    review: '',
    rating: undefined
  });

  return (
    <>
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form method="post">
          <div className="form-review__rate">
            <fieldset className="rate form-review__item">
              <legend className="rate__caption">
                        Рейтинг
                <svg width="9" height="9" aria-hidden="true">
                  <use xlinkHref="#icon-snowflake"></use>
                </svg>
              </legend>
              <div className="rate__bar">
                <div className="rate__group">
                  <input
                    className="visually-hidden"
                    id="star-5"
                    name="rate"
                    type="radio"
                    value="5"
                    onChange={(evt) => setReview((prevState) => ({...prevState, rating: +(evt.target.value)}))}
                  />
                  <label
                    className="rate__label"
                    htmlFor="star-5"
                    title="Отлично"
                  >
                  </label>
                  <input
                    className="visually-hidden"
                    id="star-4"
                    name="rate"
                    type="radio"
                    value="4"
                    onChange={(evt) => setReview((prevState) => ({...prevState, rating: +(evt.target.value)}))}
                  />
                  <label
                    className="rate__label"
                    htmlFor="star-4"
                    title="Хорошо"
                  >
                  </label>
                  <input
                    className="visually-hidden"
                    id="star-3"
                    name="rate"
                    type="radio"
                    value="3"
                    onChange={(evt) => setReview((prevState) => ({...prevState, rating: +(evt.target.value)}))}
                  />
                  <label
                    className="rate__label"
                    htmlFor="star-3"
                    title="Нормально"
                  >
                  </label>
                  <input
                    className="visually-hidden"
                    id="star-2"
                    name="rate"
                    type="radio"
                    value="2"
                    onChange={(evt) => setReview((prevState) => ({...prevState, rating: +(evt.target.value)}))}
                  />
                  <label
                    className="rate__label"
                    htmlFor="star-2"
                    title="Плохо"
                  >
                  </label>
                  <input
                    className="visually-hidden"
                    id="star-1"
                    name="rate"
                    type="radio"
                    value="1"
                    onChange={(evt) => setReview((prevState) => ({...prevState, rating: +(evt.target.value)}))}
                  />
                  <label
                    className="rate__label"
                    htmlFor="star-1"
                    title="Ужасно"
                  >
                  </label>
                </div>
                <div className="rate__progress">
                  <span className="rate__stars">{review.rating}</span> <span>/</span>
                  <span className="rate__all-stars">5</span>
                </div>
              </div>
              <p className="rate__message">Нужно оценить товар</p>
            </fieldset>
            <div className="custom-input form-review__item">
              <label >
                <span className="custom-input__label">Ваше имя
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  ref={firstInputRef}
                  onChange={(evt) => setReview((prevState) => ({...prevState, userName: evt.target.value}))}
                  value={review?.userName}
                  type="text"
                  name="user-name"
                  placeholder="Введите ваше имя"
                  required
                />
              </label>
              <p className="custom-input__error">Нужно указать имя</p>
            </div>
            <div className="custom-input form-review__item">
              <label >
                <span className="custom-input__label">Достоинства
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  value={review.advantage}
                  onChange={(evt) => setReview((prevState) => ({...prevState, advantage: evt.target.value}))}
                  type="text"
                  name="user-plus"
                  placeholder="Основные преимущества товара"
                  required
                />
              </label>
              <p className="custom-input__error">
                        Нужно указать достоинства
              </p>
            </div>
            <div className="custom-input form-review__item">
              <label >
                <span className="custom-input__label">Недостатки
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  value={review.disadvantage}
                  onChange={(evt) => setReview((prevState) => ({...prevState, disadvantage: evt.target.value}))}
                  type="text"
                  name="user-minus"
                  placeholder="Главные недостатки товара"
                  required
                />
              </label>
              <p className="custom-input__error">
                        Нужно указать недостатки
              </p>
            </div>
            <div className="custom-textarea form-review__item">
              <label >
                <span className="custom-textarea__label">Комментарий
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <textarea
                  value={review.review}
                  onChange={(evt) => setReview((prevState) => ({...prevState, review: evt.target.value}))}
                  name="user-comment"
                  minLength={5}
                  placeholder="Поделитесь своим опытом покупки"
                >
                </textarea>
              </label>
              <div className="custom-textarea__error">
                        Нужно добавить комментарий
              </div>
            </div>
          </div>
          <button
            className="btn btn--purple form-review__btn"
            type="submit"
          >
                    Отправить отзыв
          </button>
        </form>
      </div>
      <button
        onClick={() => dispatch(closeAllModal())}
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </>
  );
}
