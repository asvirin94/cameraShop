import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoutes, NameSpace } from '../../consts';
import { appInitialState } from '../../store/app-process/app-process.slice';
import { dataInitialState } from '../../store/data-process/data-process.slice';
import { MemoryRouter } from 'react-router-dom';
import PageContent from './page-content';

const mockStore = configureMockStore();
const initialState = {
  [NameSpace.Data]: dataInitialState,
  [NameSpace.App]: appInitialState,
};

describe('Component: page content', () => {
  test('should render correctly', () => {
    const {container} = render(
      <Provider store={mockStore(initialState)}>
        <MemoryRouter initialEntries={[AppRoutes.Main]}>
          <PageContent />
        </MemoryRouter>
      </Provider>
    );

    const testEl = container.querySelector('.page-content');
    expect(testEl).toBeInTheDocument();
  });
});
