import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoutes, NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { filterInitialState } from '../../store/filter-process/filter-process.slice';
import { sortInitialState } from '../../store/sort-process/sort-process.slice';
import { Provider } from 'react-redux';
import ToBasketButton from './to-basket-button';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureMockStore();

const initialState = {
  [NameSpace.Data]: dataInitialState,
  [NameSpace.App]: appInitialState,
  [NameSpace.Filter]: filterInitialState,
  [NameSpace.Sort]: sortInitialState
};

describe('Component: ToBasketButton', () => {
  test('should renders correctly', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={[AppRoutes.Main]}>
          <ToBasketButton />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('В корзине'));
  });
});
