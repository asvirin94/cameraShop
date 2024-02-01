import { render, screen } from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoutes, NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { MemoryRouter } from 'react-router-dom';
import { filterInitialState } from '../../store/filter-process/filter-process.slice';
import { sortInitialState } from '../../store/sort-process/sort-process.slice';

const mockStore = configureMockStore();
const initialState = {
  [NameSpace.Data]: dataInitialState,
  [NameSpace.App]: appInitialState,
  [NameSpace.Filter]: filterInitialState,
  [NameSpace.Sort]: sortInitialState
};

describe('Component: breadscrumbs', () => {
  test('should render correctly', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={[AppRoutes.Main]}>
          <Breadcrumbs />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Главная')).toBeInTheDocument();
  });
});
