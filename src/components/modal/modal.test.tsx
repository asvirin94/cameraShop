import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoutes, NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { MemoryRouter } from 'react-router-dom';
import Modal from './modal';

const mockStore = configureMockStore();
const initialState = {
  [NameSpace.Data]: dataInitialState,
  [NameSpace.App]: {...appInitialState, isModalOpen: true}
};

describe('Component: modal', () => {
  test('should render correctly', () => {
    const {container} = render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={[AppRoutes.Main]}>
          <Modal />
        </MemoryRouter>
      </Provider>
    );

    const activeModal = container.querySelector('.is-active');
    expect(activeModal).toBeInTheDocument();
  });
});
