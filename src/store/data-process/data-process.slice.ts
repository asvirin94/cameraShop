import { createSlice } from '@reduxjs/toolkit';
import { ProductType } from '../../types/types';
import { NameSpace } from '../../consts';
import { loadProductsAction } from '../api-actions';

type InitialStateType = {
  products: ProductType[];
  isProductsLoaded: boolean;
}

const initialState: InitialStateType = {
  products: [],
  isProductsLoaded: false
};

export const dataSlice = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loadProductsAction.pending, (state) => {
        state.isProductsLoaded = false;
      })
      .addCase(loadProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isProductsLoaded = true;
      });
  },
});
