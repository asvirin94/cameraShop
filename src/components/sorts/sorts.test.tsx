import { render, screen } from '@testing-library/react';
import Sorts from './sorts';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoutes, NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { filterInitialState } from '../../store/filter-process/filter-process.slice';
import { sortInitialState } from '../../store/sort-process/sort-process.slice';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const initialState = {
  [NameSpace.Data]: dataInitialState,
  [NameSpace.App]: appInitialState,
  [NameSpace.Filter]: filterInitialState,
  [NameSpace.Sort]: sortInitialState
};
describe('Component: sorts', () => {
  test('should render correctly', () => {

    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={[AppRoutes.Main]}>
          <Sorts />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Сортировать:')).toBeInTheDocument();
  });
});
