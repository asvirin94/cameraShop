import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ProductType, Promos, Review } from '../../types/types';
import { NameSpace } from '../../consts';
import { loadProductsAction, loadPromosAction, loadReviewsAction, loadSimilarProductsAction } from '../api-actions';

type InitialStateType = {
  products: ProductType[];
  promos: Promos;
  similarProducts: ProductType[];
  reviews: Review[];
  isProductsLoaded: boolean;
  isOrderSend: boolean | null;
  errorMessage: string | null;
}

export const dataInitialState: InitialStateType = {
  products: [],
  promos: [],
  similarProducts: [],
  reviews: [],
  isProductsLoaded: false,
  isOrderSend: null,
  errorMessage: null
};

export const dataSlice = createSlice({
  name: NameSpace.Data,
  initialState: dataInitialState,
  reducers: {
    setIsOrderSend: (state, action: PayloadAction<boolean>) => {
      state.isOrderSend = action.payload;
      if(!action.payload) {
        state.errorMessage = 'Что-то пошло не так...';
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(loadProductsAction.pending, (state) => {
        state.isProductsLoaded = false;
      })
      .addCase(loadProductsAction.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isProductsLoaded = true;
      })
      .addCase(loadPromosAction.fulfilled, (state, action) => {
        state.promos = action.payload;
      })
      .addCase(loadSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
      })
      .addCase(loadReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  },
});

export const {setIsOrderSend} = dataSlice.actions;
