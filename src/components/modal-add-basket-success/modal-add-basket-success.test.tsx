import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoutes, NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { filterInitialState } from '../../store/filter-process/filter-process.slice';
import { sortInitialState } from '../../store/sort-process/sort-process.slice';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ModalAddToBasketSuccess from './modal-add-to-basket-success';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureMockStore();

const initialState = {
  [NameSpace.Data]: dataInitialState,
  [NameSpace.App]: {...appInitialState, currentPage: 0},
  [NameSpace.Filter]: filterInitialState,
  [NameSpace.Sort]: sortInitialState
};

describe('Component: modal-addbasket-success', () => {
  test('should render correctly', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={[AppRoutes.Main]}>
          <ModalAddToBasketSuccess />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Товар успешно добавлен в корзину'));
  });
});
