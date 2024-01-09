import { createApi } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { ProductType, Promos, Review, StateType } from '../types/types';
import { configureMockStore } from '@jedmao/redux-mock-store';
import {
  loadProductsAction,
  loadPromosAction,
  loadReviewsAction,
  loadSimilarProductsAction,
  sendNewReviewAction,
} from './api-actions';

describe('async actions', () => {
  const api = createApi();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    StateType,
    Action<string>,
    ThunkDispatch<StateType, typeof api, Action>
  >(middlewares);

  test('should dispatch loadProductsAction when GET/cameras', async () => {
    const mockProducts: ProductType[] = [
      {
        id: 1,
        name: 'Ретрокамера Dus Auge lV',
        vendorCode: 'DA4IU67AD5',
        type: 'Коллекционная',
        category: 'Видеокамера',
        description:
          'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
        level: 'Нулевой',
        price: 65000,
        rating: 5,
        reviewCount: 16,
        previewImg: 'img/content/das-auge.jpg',
        previewImg2x: 'img/content/das-auge@2x.jpg',
        previewImgWebp: 'img/content/das-auge.webp',
        previewImgWebp2x: 'img/content/das-auge@2x.webp',
      },
    ];

    mockAPI
      .onGet('https://camera-shop.accelerator.pages.academy/cameras')
      .reply(200, mockProducts);

    const store = mockStore();

    await store.dispatch(loadProductsAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loadProductsAction.pending.type,
      loadProductsAction.fulfilled.type,
    ]);
  });

  test('should dispatch loadPromosAction when GET/promo', async () => {
    const mockPromoProducts: Promos = [
      {
        id: 1,
        name: 'Ретрокамера Dus Auge lV',
        previewImg: 'img/content/promo.jpg',
        previewImg2x: 'img/content/promo@2x.jpg',
        previewImgWebp: 'img/content/promo.webp',
        previewImgWebp2x: 'img/content/promo@2x.webp',
      },
    ];

    mockAPI
      .onGet('https://camera-shop.accelerator.pages.academy/promo')
      .reply(200, mockPromoProducts);

    const store = mockStore();

    await store.dispatch(loadPromosAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loadPromosAction.pending.type,
      loadPromosAction.fulfilled.type,
    ]);
  });

  test('should dispatch loadSimilarProductsAction when GET/cameras/:id/similar', async () => {
    const mockSimilarProducts: ProductType[] = [
      {
        id: 1,
        name: 'Ретрокамера Dus Auge lV',
        vendorCode: 'DA4IU67AD5',
        type: 'Коллекционная',
        category: 'Видеокамера',
        description:
          'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
        level: 'Нулевой',
        price: 65000,
        rating: 5,
        reviewCount: 16,
        previewImg: 'img/content/das-auge.jpg',
        previewImg2x: 'img/content/das-auge@2x.jpg',
        previewImgWebp: 'img/content/das-auge.webp',
        previewImgWebp2x: 'img/content/das-auge@2x.webp',
      },
    ];

    mockAPI
      .onGet('https://camera-shop.accelerator.pages.academy/cameras/20/similar')
      .reply(200, mockSimilarProducts);

    const store = mockStore();

    await store.dispatch(loadSimilarProductsAction(20));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loadSimilarProductsAction.pending.type,
      loadSimilarProductsAction.fulfilled.type,
    ]);
  });

  test('should dispatch loadReviewsAction when GET/cameras/:id/reviews', async () => {
    const mockReviews: Review[] = [
      {
        id: 'f1d10ddd-2a21-4f71-9e1e-5f511703fbdd',
        createAt: '2022-07-09T13:24:57.980Z',
        cameraId: 1,
        userName: 'Кирилл',
        advantage: 'Легкая в плане веса, удобная в интерфейсе',
        disadvantage: 'Быстро садиться зарядка',
        review: 'Это моя первая камера. Я в восторге, нареканий нет',
        rating: 5,
      },
    ];

    mockAPI
      .onGet('https://camera-shop.accelerator.pages.academy/cameras/20/reviews')
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(loadReviewsAction(20));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loadReviewsAction.pending.type,
      loadReviewsAction.fulfilled.type,
    ]);
  });

  test('should dispatch sendNewReviewAction when POST/reviews', async () => {
    const mockReviews: Review[] = [
      {
        id: 'f1d10ddd-2a21-4f71-9e1e-5f511703fbdd',
        createAt: '2022-07-09T13:24:57.980Z',
        cameraId: 1,
        userName: 'Кирилл',
        advantage: 'Легкая в плане веса, удобная в интерфейсе',
        disadvantage: 'Быстро садиться зарядка',
        review: 'Это моя первая камера. Я в восторге, нареканий нет',
        rating: 5
      },
    ];

    const mockNewReview = {
      cameraId: 1,
      userName: 'Кирилл',
      advantage: 'Легкая в плане веса, удобная в интерфейсе',
      disadvantage: 'Быстро садиться зарядка',
      review: 'Это моя первая камера. Я в восторге, нареканий нет',
      rating: 5
    };

    mockAPI
      .onPost('https://camera-shop.accelerator.pages.academy/reviews', mockNewReview)
      .reply(201, mockReviews);

    const store = mockStore();

    await store.dispatch(sendNewReviewAction(mockNewReview));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      sendNewReviewAction.pending.type,
      sendNewReviewAction.fulfilled.type,
    ]);
  });
});
