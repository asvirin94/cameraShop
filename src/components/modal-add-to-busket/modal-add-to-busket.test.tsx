import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoutes, NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { MemoryRouter } from 'react-router-dom';
import Modal from '../modal/modal';

const mockStore = configureMockStore();
const initialState = {
  [NameSpace.Data]: dataInitialState,
  [NameSpace.App]: {...appInitialState, isModalOpen: true, isModalAddToBusketOpen: true}
};

describe('Component: modal add to busket', () => {
  test('should render correctly', () => {
    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={[AppRoutes.Main]}>
          <Modal />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
  });
});