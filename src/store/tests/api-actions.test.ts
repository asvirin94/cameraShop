import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loadProductsAction } from '../api-actions';
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Test ', () => {
  test('test request', async () => {
    const mockResponce = 1;

    fetchMock.mock('https://camera-shop.accelerator.pages.academy/cameras', {
      body: mockResponce,
      // headers: { 'content-type': 'application/json' },
      status: 200
    });

    const store = mockStore();
    // // eslint-disable-next-line no-console
    console.log('result', store);
    console.log('actions', store.getActions());

    const res = await store.dispatch(loadProductsAction());
    console.log('res', store.getActions());
    return true;
  });
});
