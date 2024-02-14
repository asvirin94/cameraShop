import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { ProductType } from '../../types/types';

type InitialStateType = {
  currentPage: number;
  productOnPage: ProductType | undefined;
  productToAdd: ProductType | undefined;
  isModalOpen: boolean;
  isModalAddToBasketOpen: boolean;
  isModalAddReviewOpen: boolean;
  isModalNewReviewSuccessOpen: boolean;
  isModalAddToBasketSuccessOpen: boolean;
  filteredAndSortedProducts: ProductType[];
  productsInBasket: ProductType[];
  productsInBusketPrice: number;
};

export const appInitialState: InitialStateType = {
  currentPage: 0,
  productOnPage: undefined,
  productToAdd: undefined,
  isModalOpen: false,
  isModalAddToBasketOpen: false,
  isModalAddReviewOpen: false,
  isModalNewReviewSuccessOpen: false,
  isModalAddToBasketSuccessOpen: false,
  filteredAndSortedProducts: [],
  productsInBasket: [],
  productsInBusketPrice: 0
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState: appInitialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setModalIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setisModalAddToBasketOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalAddToBasketOpen = action.payload;
    },
    setIsModalAddReviewOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalAddReviewOpen = action.payload;
    },
    closeAllModal: (state) => {
      state.isModalAddToBasketOpen = false;
      state.isModalOpen = false;
      state.isModalAddReviewOpen = false;
      state.isModalNewReviewSuccessOpen = false;
      state.isModalAddToBasketSuccessOpen = false;
    },
    setproductToAdd: (
      state,
      action: PayloadAction<ProductType | undefined>
    ) => {
      state.productToAdd = action.payload;
    },
    setProductOnPage: (
      state,
      action: PayloadAction<ProductType | undefined>
    ) => {
      state.productOnPage = action.payload;
    },
    setIsModalNewReviewSuccessOpen: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.isModalNewReviewSuccessOpen = action.payload;
    },
    setisModalAddToBasketSuccessOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalAddToBasketSuccessOpen = action.payload;
    },
    setFilteredAndSortedProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.filteredAndSortedProducts = action.payload;
    },
    addProductToBasket: (state, action: PayloadAction<ProductType | undefined>) => {
      if(action.payload && !state.productsInBasket.includes(action.payload)) {
        state.productsInBasket.push(action.payload);
      }
    },
    removeProductFromBasket: (state, action: PayloadAction<number>) => {
      state.productsInBasket = state.productsInBasket.filter((product) => product.id !== action.payload);
    },
    changeTotalPrice: (state, action: PayloadAction<number>) => {
      state.productsInBusketPrice = state.productsInBusketPrice + action.payload;
    }
  },
});

export const {
  setCurrentPage,
  setModalIsOpen,
  setisModalAddToBasketOpen,
  closeAllModal,
  setproductToAdd,
  setIsModalAddReviewOpen,
  setProductOnPage,
  setIsModalNewReviewSuccessOpen,
  setFilteredAndSortedProducts,
  setisModalAddToBasketSuccessOpen,
  addProductToBasket,
  removeProductFromBasket,
  changeTotalPrice
} = appSlice.actions;
