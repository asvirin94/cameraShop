import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoutes, NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { MemoryRouter } from 'react-router-dom';
import Footer from './footer';

const mockStore = configureMockStore();
const initialState = {
  [NameSpace.Data]: dataInitialState,
  [NameSpace.App]: appInitialState,
};

describe('Component: footer', () => {
  test('should render correctly', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={[AppRoutes.Main]}>
          <Footer />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Поддержка')).toBeInTheDocument();
  });
});
