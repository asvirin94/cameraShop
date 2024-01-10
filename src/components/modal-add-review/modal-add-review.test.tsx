import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoutes, NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { MemoryRouter } from 'react-router-dom';
import Modal from '../modal/modal';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const initialState = {
  [NameSpace.Data]: dataInitialState,
  [NameSpace.App]: {...appInitialState, idModalOpen: true, isModalAddReviewOpen: true},
};

describe('Component: modal add review', () => {
  test('should render correctly', async () => {
    render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={[AppRoutes.Main]}>
          <Modal />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Достоинства')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('userName'), 'alex');
    expect(screen.getByDisplayValue('alex')).toBeInTheDocument();
  });
});
