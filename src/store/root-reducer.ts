import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../consts';
import { dataSlice } from './data-process/data-process.slice';
import { appSlice } from './app-process/app-process.slice';
import { sortSlice } from './sort-process/sort-process.slice';

export const rootReducer = combineReducers({
  [NameSpace.Data]: dataSlice.reducer,
  [NameSpace.App]: appSlice.reducer,
  [NameSpace.Sort]: sortSlice.reducer
});
