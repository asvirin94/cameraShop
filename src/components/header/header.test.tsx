import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoutes, NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { MemoryRouter } from 'react-router-dom';
import Header from './header';
import { ProductType } from '../../types/types';
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

const mockStore = configureMockStore();
const initialState = {
  [NameSpace.Data]: {...dataInitialState, products: mockProducts},
  [NameSpace.App]: appInitialState,
  [NameSpace.Filter]: filterInitialState,
  [NameSpace.Sort]: sortInitialState
};

describe('Component: header', () => {
  test('should render correctly', () => {
    const {container} = render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={[AppRoutes.Main]}>
          <Header/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Гарантии')).toBeInTheDocument();

    const input = container.querySelector('.form-search__input') as Element;
    fireEvent.change(input, { target: { value: 'Dus' } });
    expect(screen.getByText('Ретрокамера Dus Auge lV')).toBeInTheDocument();
  });
});
