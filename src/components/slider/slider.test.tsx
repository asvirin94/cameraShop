import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { MemoryRouter } from 'react-router-dom';
import Slider from './slider';
import { ProductType } from '../../types/types';

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

const mockStore = configureMockStore();
const initialState = {
  [NameSpace.Data]: {...dataInitialState, similarProducts: mockSimilarProducts},
  [NameSpace.App]: appInitialState,
};

describe('Component: filter', () => {
  test('should render correctly', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter>
          <Slider />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Похожие товары')).toBeInTheDocument();
    expect(screen.getByText('Купить')).toBeInTheDocument();
  });
});
