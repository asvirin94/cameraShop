import { ProductType, Promos, Review } from '../../types/types';
import {
  loadProductsAction,
  loadPromosAction,
  loadReviewsAction,
  loadSimilarProductsAction,
} from '../api-actions';
import { dataSlice, initialState } from './data-process.slice';

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

describe('data process testing', () => {
  test('should set loaded products', () => {
    const expectedState = dataSlice.reducer(
      initialState,
      loadProductsAction.fulfilled(mockProducts, 'someArg', undefined)
    );

    expect(expectedState.products).toEqual(mockProducts);
  });

  test('should set similar products', () => {
    const expectedState = dataSlice.reducer(
      initialState,
      loadSimilarProductsAction.fulfilled(mockSimilarProducts, 'someArg', 1)
    );

    expect(expectedState.similarProducts).toEqual(mockSimilarProducts);
  });

  test('should set promo products', () => {
    const expectedState = dataSlice.reducer(
      initialState,
      loadPromosAction.fulfilled(mockPromoProducts, 'someArg', undefined)
    );

    expect(expectedState.promos).toEqual(mockPromoProducts);
  });

  test('should set reviews', () => {
    const expectedState = dataSlice.reducer(
      initialState,
      loadReviewsAction.fulfilled(mockReviews, 'someArg', 1)
    );

    expect(expectedState.reviews).toEqual(mockReviews);
  });
});
