import { setCurrentPage } from '../app-process/app-process.slice';

describe('testing approcess', () => {
  test('setCurentPage testing', () => {
    const expectedActionsSetCurrentPage = {
      type: 'APP/setCurrentPage',
      payload: 20
    };
    expect(setCurrentPage(20)).toEqual(expectedActionsSetCurrentPage);
  });
});
