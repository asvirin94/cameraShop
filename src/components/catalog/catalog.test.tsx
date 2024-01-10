import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { AppRoutes, NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Catalog from './catalog';

const mockStore = configureMockStore();
const initialState = {
  [NameSpace.Data]: dataInitialState,
  [NameSpace.App]: appInitialState,
};

describe('Component: catalog', () => {
  test('should render correctly', () => {

    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={[AppRoutes.Main]}>
          <Catalog />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Каталог фото- и видеотехники')).toBeInTheDocument();
  });
});
