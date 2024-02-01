import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoutes, NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { MemoryRouter } from 'react-router-dom';
import { ProductType, Promos } from '../../types/types';
import { HelmetProvider } from 'react-helmet-async';
import App from '../../components/app/app';
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

const mockStore = configureMockStore();
const initialState = {
  [NameSpace.Data]: {...dataInitialState, products: mockProducts, promos: mockPromoProducts},
  [NameSpace.App]: {...appInitialState},
  [NameSpace.Filter]: filterInitialState,
  [NameSpace.Sort]: sortInitialState
};

describe('Page: start page', () => {
  test('should render correctly', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={[AppRoutes.Main]}>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
    expect(screen.getByText('Категория')).toBeInTheDocument();
    expect(screen.getByText('Поддержка')).toBeInTheDocument();
  });
});
