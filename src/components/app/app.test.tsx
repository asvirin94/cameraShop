import { AppRoutes, NameSpace } from '../../consts';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './app';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { HelmetProvider } from 'react-helmet-async';
import { ProductType } from '../../types/types';

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

const mockStore = configureMockStore();

const initialState = {
  [NameSpace.Data]: {...dataInitialState, products: mockProducts},
  [NameSpace.App]: appInitialState
};

describe('App routing', () => {
  test('renders StartPage for the default route', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoutes.Main]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText('Каталог фото- и видеотехники')
    ).toBeInTheDocument();
  });

  test('renders StartPage when user navigate to "/?page=:page"', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${AppRoutes.Main}?page=1`]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText('Каталог фото- и видеотехники')
    ).toBeInTheDocument();
  });

  test('renders ProductPage when user navigate to "/product/:id/:tab"', () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${AppRoutes.Main}product/1/description`]}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );

    screen.debug();

    expect(
      screen.queryByText('Характеристики')
    ).toBeInTheDocument();
  });
});
