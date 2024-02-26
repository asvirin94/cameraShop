import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { filterInitialState } from '../../store/filter-process/filter-process.slice';
import { sortInitialState } from '../../store/sort-process/sort-process.slice';
import { Provider } from 'react-redux';
import BasketItem from './basket-item';
import { ProductType } from '../../types/types';
import { render, screen } from '@testing-library/react';

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
  [NameSpace.Data]: { ...dataInitialState, products: mockProducts },
  [NameSpace.App]: {...appInitialState, productsInBasketData: [{id: 1, count: 1}]},
  [NameSpace.Filter]: filterInitialState,
  [NameSpace.Sort]: sortInitialState
};

describe('Component: BasketItem', () => {
  test('should renders correctly', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <BasketItem product={mockProducts[0]}/>
      </Provider>
    );

    expect(screen.getByText('Артикул:'));
  });
});
