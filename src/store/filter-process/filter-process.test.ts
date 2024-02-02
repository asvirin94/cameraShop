import { filterInitialState, filterSlice } from './filter-process.slice';

describe('testing filter process', () => {
  test('should set category', () => {
    const action = filterSlice.actions.setCategory('video');
    const result = filterSlice.reducer(filterInitialState, action);

    const expectedState = {
      ...filterInitialState,
      category: 'video'
    };

    expect(result).toEqual(expectedState);
  });

  test('should set level', () => {
    const action = filterSlice.actions.setLevel('zero');
    const result = filterSlice.reducer(filterInitialState, action);

    const expectedState = {
      ...filterInitialState,
      level: ['zero']
    };

    expect(result).toEqual(expectedState);
  });
});
