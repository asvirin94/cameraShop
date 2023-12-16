import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts';
import { dataSlice } from './data-process/data-process.slice';
import { appSlice } from './app-process/app-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataSlice.reducer,
  [NameSpace.App]: appSlice.reducer
});
