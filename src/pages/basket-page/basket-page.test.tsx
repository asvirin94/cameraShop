import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoutes, NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { filterInitialState } from '../../store/filter-process/filter-process.slice';
import { sortInitialState } from '../../store/sort-process/sort-process.slice';
import { ProductInBasket, ProductType } from '../../types/types';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import BasketPage from './basket-page';
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';

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

const mockBasketData: ProductInBasket[] = [
  {
    id: 1,
    count: 2
  }
];

const mockStore = configureMockStore();

const initialState = {
  [NameSpace.Data]: {...dataInitialState, products: mockProducts},
  [NameSpace.App]: {...appInitialState, productsInBasketData: mockBasketData, isPromoCodeApplied: false, promoCode: null},
  [NameSpace.Filter]: filterInitialState,
  [NameSpace.Sort]: sortInitialState
};

describe('Page: BasketPage', () => {
  test('should render correctly', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={[`/${AppRoutes.Basket}`]}>
          <HelmetProvider>
            <BasketPage />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryByText('Корзина', { selector: 'h1' }));
  });
});
