import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { closeAllModal } from '../../store/app-process/app-process.slice';
import {
  getIsModalAddReviewOpen,
  getproductOnPage,
} from '../../store/app-process/app-process.selectors';
import { useForm } from 'react-hook-form';
import { loadReviewsAction, sendNewReviewAction } from '../../store/api-actions';
import { NewReview } from '../../types/types';

export default function ModalAddReview() {
  const dispatch = useAppDispatch();
  const productId = useAppSelector(getproductOnPage)?.id;
  const isModalOpen = useAppSelector(getIsModalAddReviewOpen);
  const firstInputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    trigger,
    setValue
  } = useForm();

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus();
        }
      }, 10);
    }
  }, [isModalOpen]);

  const checkName = () => {
    const { userName } = getValues();
    if (typeof userName === 'string') {
      const isValid = userName.length > 1 && userName.length < 16;
      return isValid || 'Имя должно содержать от 2 до 15 символов';
    }
  };

  const checkAdvantages = () => {
    const { advantages } = getValues();
    if (typeof advantages === 'string') {
      const isValid = advantages.length > 9 && advantages.length < 161;
      return isValid || 'От 10 до 160 символов';
    }
  };

  const checkDisadvantages = () => {
    const { disadvantages } = getValues();
    if (typeof disadvantages === 'string') {
      const isValid = disadvantages.length > 9 && disadvantages.length < 161;
      return isValid || 'От 10 до 160 символов';
    }
  };

  const checkReview = () => {
    const { review } = getValues();
    if (typeof review === 'string') {
      const isValid = review.length > 9 && review.length < 161;
      return isValid || 'От 10 до 160 символов';
    }
  };

  const onSubmit = () => {
    const {userName, advantages, disadvantages, review, rate} = getValues();
    const newReview: NewReview = {
      cameraId: productId,
      userName: userName as string,
      advantage: advantages as string,
      disadvantage: disadvantages as string,
      review: review as string,
      rating: +rate
    };

    dispatch(sendNewReviewAction(newReview))
      .then(() => {
        dispatch(closeAllModal());
        dispatch(loadReviewsAction(productId as number));
      });
  };

  return (
    <>
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form
          method="post"
          onSubmit={(evt) => {
            evt.preventDefault();
            void handleSubmit(onSubmit)(evt);
          }}
        >
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
                    {...register('rate', {
                      required: 'Укажите оценку'
                    })}
                    className="visually-hidden"
                    id="star-5"
                    type="radio"
                    value="5"
                    onChange={(evt) => {
                      setValue('rate', evt.target.value);
                      trigger('rate');
                    }}
                  />
                  <label
                    className="rate__label"
                    htmlFor="star-5"
                    title="Отлично"
                  >
                  </label>
                  <input
                    {...register('rate', {
                      required: 'Укажите оценку'
                    })}
                    className="visually-hidden"
                    id="star-4"
                    type="radio"
                    value="4"
                    onChange={(evt) => {
                      setValue('rate', evt.target.value);
                      trigger('rate');
                    }}
                  />
                  <label
                    className="rate__label"
                    htmlFor="star-4"
                    title="Хорошо"
                  >
                  </label>
                  <input
                    {...register('rate', {
                      required: 'Укажите оценку'
                    })}
                    className="visually-hidden"
                    id="star-3"
                    type="radio"
                    value="3"
                    onChange={(evt) => {
                      setValue('rate', evt.target.value);
                      trigger('rate');
                    }}
                  />
                  <label
                    className="rate__label"
                    htmlFor="star-3"
                    title="Нормально"
                  >
                  </label>
                  <input
                    {...register('rate', {
                      required: 'Укажите оценку'
                    })}
                    className="visually-hidden"
                    id="star-2"
                    type="radio"
                    value="2"
                    onChange={(evt) => {
                      setValue('rate', evt.target.value);
                      trigger('rate');
                    }}
                  />
                  <label
                    className="rate__label"
                    htmlFor="star-2"
                    title="Плохо"
                  >
                  </label>
                  <input
                    {...register('rate', {
                      required: 'Укажите оценку'
                    })}
                    className="visually-hidden"
                    id="star-1"
                    type="radio"
                    value="1"
                    onChange={(evt) => {
                      setValue('rate', evt.target.value);
                      trigger('rate');
                    }}
                  />
                  <label
                    className="rate__label"
                    htmlFor="star-1"
                    title="Ужасно"
                  >
                  </label>
                </div>
                <div className="rate__progress">
                  <span className="rate__stars">{getValues().rate || 0}</span>
                  <span>/</span>
                  <span className="rate__all-stars">5</span>
                </div>
              </div>
              {errors.rate && <p style={{opacity: 1}} className="rate__message">{errors.rate.message as string}</p>}
            </fieldset>
            <div className="custom-input form-review__item">
              <label>
                <span className="custom-input__label">
                  Ваше имя
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  {...register('userName', {
                    required: 'Нужно указать имя',
                    validate: {
                      checkName
                    }
                  })}
                  data-testid='userName'
                  type="text"
                  placeholder="Введите ваше имя"
                  ref={(el) => {
                    firstInputRef.current = el;
                  }}
                  onChange={(evt) => {
                    setValue('userName', evt.target.value);
                    trigger('userName');
                  }}
                />
              </label>

              {errors.userName &&
              <p className="custom-input__error" style={{opacity: 1}} >
                {errors.userName.message as string}
              </p>}
            </div>
            <div className="custom-input form-review__item">
              <label>
                <span className="custom-input__label">
                  Достоинства
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  {...register('advantages', {
                    required: 'Нужно указать достоинства',
                    validate: {
                      checkAdvantages
                    }
                  })}
                  type="text"
                  placeholder="Основные преимущества товара"
                />
              </label>
              {errors.advantages && (
                <p className="custom-input__error" style={{opacity: 1}} >
                  {errors.advantages.message as string}
                </p>
              )}
            </div>
            <div className="custom-input form-review__item">
              <label>
                <span className="custom-input__label">
                  Недостатки
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  {...register('disadvantages', {
                    required: 'Нужно указать недостатки',
                    validate: {
                      checkDisadvantages
                    }
                  })}
                  type="text"
                  placeholder="Главные недостатки товара"
                />
              </label>
              {errors.disadvantages && (
                <p className="custom-input__error" style={{opacity: 1}} >
                  {errors.disadvantages.message as string}
                </p>
              )}
            </div>
            <div className="custom-textarea form-review__item">
              <label>
                <span className="custom-textarea__label">
                  Комментарий
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <textarea
                  placeholder="Поделитесь своим опытом покупки"
                  {...register('review', {
                    required: 'Нужно добавить комментарий',
                    validate: {
                      checkReview
                    }
                  })}
                >
                </textarea>
              </label>
              {errors.review && (
                <div className="custom-textarea__error" style={{opacity: 1}} >
                  {errors.review.message as string}
                </div>
              )}
            </div>
          </div>
          <button className="btn btn--purple form-review__btn" type="submit">
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
