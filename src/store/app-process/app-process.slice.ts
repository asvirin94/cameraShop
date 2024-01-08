import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { ProductType } from '../../types/types';

type InitialStateType = {
  currentPage: number;
  productOnPage: ProductType | undefined;
  productToAdd: ProductType | undefined;
  isModalOpen: boolean;
  isModalAddToBusketOpen: boolean;
  isModalAddReviewOpen: boolean;
};

export const initialState: InitialStateType = {
  currentPage: 0,
  productOnPage: undefined,
  productToAdd: undefined,
  isModalOpen: false,
  isModalAddToBusketOpen: false,
  isModalAddReviewOpen: false,
};

export const appSlice = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setModalIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOpen = action.payload;
    },
    setisModalAddToBusketOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalAddToBusketOpen = action.payload;
    },
    setIsModalAddReviewOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalAddReviewOpen = action.payload;
    },
    closeAllModal: (state) => {
      state.isModalAddToBusketOpen = false;
      state.isModalOpen = false;
      state.isModalAddReviewOpen = false;
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
  },
});

export const {
  setCurrentPage,
  setModalIsOpen,
  setisModalAddToBusketOpen,
  closeAllModal,
  setproductToAdd,
  setIsModalAddReviewOpen,
  setProductOnPage,
} = appSlice.actions;
