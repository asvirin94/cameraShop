import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoutes, NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { MemoryRouter } from 'react-router-dom';
import Pagination from './pagination';
import { ProductType } from '../../types/types';

const mockProduct: ProductType = {
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
};

const mockStore = configureMockStore();

describe('Component: pagination', () => {
  test('should render correctly', () => {
    const mockProductsArray = new Array(12).fill(null).map(() => mockProduct);
    const initialState = {
      [NameSpace.Data]: {...dataInitialState, products: mockProductsArray},
      [NameSpace.App]: appInitialState,
    };

    const {container} = render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={[AppRoutes.Main]}>
          <Pagination />
        </MemoryRouter>
      </Provider>
    );

    const pagItem = container.querySelector('.pagination__item');
    expect(pagItem).toBeInTheDocument();
  });

  test('should not render if products count less than 10', () => {
    const mockProductsArray = new Array(9).fill(null).map(() => mockProduct);
    const initialState = {
      [NameSpace.Data]: {...dataInitialState, products: mockProductsArray},
      [NameSpace.App]: appInitialState,
    };

    const {container} = render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={[AppRoutes.Main]}>
          <Pagination />
        </MemoryRouter>
      </Provider>
    );

    const pagItem = container.querySelector('.pagination__item');
    expect(pagItem).not.toBeInTheDocument();
  });
});
