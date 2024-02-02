import { sortInitialState, sortSlice } from './sort-process.slice';

describe('testing sort process', () => {
  test('should set sort type', () => {
    const action = sortSlice.actions.setSortType('price');
    const result = sortSlice.reducer(sortInitialState, action);

    const expectedState = {
      ...sortInitialState,
      sortType: 'price'
    };

    expect(result).toEqual(expectedState);
  });

  test('should set sort direction', () => {
    const action = sortSlice.actions.setSortDirection('fromLowToHigh');
    const result = sortSlice.reducer(sortInitialState, action);

    const expectedState = {
      ...sortInitialState,
      sortDirection: 'fromLowToHigh'
    };

    expect(result).toEqual(expectedState);
  });
});
