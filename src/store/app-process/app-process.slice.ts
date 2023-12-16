import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';

type InitialStateType = {
  currentPage: number;
  currentSector: number;
};

const initialState: InitialStateType = {
  currentPage: 0,
  currentSector: 0
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  }
});

export const {setCurrentPage} = appSlice.actions;
