import { AppRoutes, NameSpace } from '../../consts';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import App from './app';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { appInitialState } from '../../store/app-process/app-process.slice';

const mockStore = configureMockStore();

const initialState = {
  [NameSpace.Data]: dataInitialState,
  [NameSpace.App]: appInitialState
};

describe('App routing', () => {
  test('renders StartPage for the default route', () => {

    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoutes.Main]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(
      screen.getByText('Каталог фото- и видеотехники')
    ).toBeInTheDocument();
  });
});
