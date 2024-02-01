import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { MemoryRouter } from 'react-router-dom';
import { ProductType, Review } from '../../types/types';
import Reviews from './reviews';
import { filterInitialState } from '../../store/filter-process/filter-process.slice';
import { sortInitialState } from '../../store/sort-process/sort-process.slice';

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

const mockStore = configureMockStore();
const initialState = {
  [NameSpace.Data]: {
    ...dataInitialState,
    products: mockProducts,
    reviews: mockReviews,
  },
  [NameSpace.App]: appInitialState,
  [NameSpace.Filter]: filterInitialState,
  [NameSpace.Sort]: sortInitialState
};

describe('Component: reviews', () => {
  test('should render correctly', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={['/product/1/description']}>
          <Reviews />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Отзывы')).toBeInTheDocument();
    expect(screen.getByText('Кирилл')).toBeInTheDocument();
    expect(screen.getByText('Достоинства:')).toBeInTheDocument();
  });
});
