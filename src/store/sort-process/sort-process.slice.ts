import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';

type InitialState = {
  sortType: string | undefined;
  sortDirection: string | undefined;
}

export const sortInitialState: InitialState = {
  sortType: undefined,
  sortDirection: undefined
};

export const sortSlice = createSlice({
  name: NameSpace.Sort,
  initialState: sortInitialState,
  reducers: {
    setSortType: (state, action: PayloadAction<string>) => {
      state.sortType = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<string>) => {
      state.sortDirection = action.payload;
    }
  }
});

export const {setSortType, setSortDirection} = sortSlice.actions;
