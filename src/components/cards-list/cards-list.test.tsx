import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoutes, NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { ProductType } from '../../types/types';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import CardsList from './cards-list';
import { filterInitialState } from '../../store/filter-process/filter-process.slice';
import { sortInitialState } from '../../store/sort-process/sort-process.slice';

describe('Component: cards-list', () => {
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

  const mockProductsArray = new Array(8).fill(null).map(() => mockProduct);

  test('should return all products at one time if count less or equal than 9', () => {

    const initialState = {
      [NameSpace.Data]: {...dataInitialState, isProductsLoaded: true, products: mockProductsArray},
      [NameSpace.App]: {...appInitialState, currentPage: 0, filteredAndSortedProducts: mockProductsArray},
      [NameSpace.Filter]: filterInitialState,
      [NameSpace.Sort]: sortInitialState
    };

    const mockStore = configureMockStore();

    const {container} = render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={[AppRoutes.Main]}>
          <CardsList />
        </MemoryRouter>
      </Provider>
    );

    expect(container.getElementsByClassName('product-card').length).toBe(mockProductsArray.length);
  });


  test('should render correctly', () => {
    const initialState = {
      [NameSpace.Data]: {...dataInitialState, isProductsLoaded: true, products: mockProductsArray},
      [NameSpace.App]: {...appInitialState, currentPage: 0, filteredAndSortedProducts: mockProductsArray},
      [NameSpace.Filter]: filterInitialState,
      [NameSpace.Sort]: sortInitialState
    };

    const mockStore = configureMockStore();
    const {container} = render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={[AppRoutes.Main]}>
          <CardsList />
        </MemoryRouter>
      </Provider>
    );

    const cards = container.querySelector('.product-card');
    expect(cards).toBeInTheDocument();
  });
});
