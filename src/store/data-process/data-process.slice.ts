import { createSlice } from '@reduxjs/toolkit';
import { ProductType, Promos } from '../../types/types';
import { NameSpace } from '../../consts';
import { getPromosAction, loadProductsAction } from '../api-actions';

type InitialStateType = {
  products: ProductType[];
  promos: Promos;
  isProductsLoaded: boolean;
}

const initialState: InitialStateType = {
  products: [],
  promos: [],
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
      })
      .addCase(getPromosAction.fulfilled, (state, action) => {
        state.promos = action.payload;
      });
  },
});
