import { render, screen } from '@testing-library/react';
import Banner from './banner';
import { Promos } from '../../types/types';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { Provider } from 'react-redux';

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
  [NameSpace.Data]: { ...dataInitialState, promos: mockPromoProducts },
  [NameSpace.App]: appInitialState,
};

describe('Component: Banner', () => {
  test('should render correctly', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <Banner />
      </Provider>
    );

    expect(screen.getByText('Подробнее'));
  });
});
