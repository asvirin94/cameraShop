import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { ProductType } from '../../types/types';

type InitialStateType = {
  currentPage: number;
  productToAdd: ProductType | undefined;
  isModalOpen: boolean;
  isModalAddToBusketOpen: boolean;
};

const initialState: InitialStateType = {
  currentPage: 0,
  productToAdd: undefined,
  isModalOpen: false,
  isModalAddToBusketOpen: false
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
    closeAllModal: (state) => {
      state.isModalAddToBusketOpen = false;
      state.isModalOpen = false;
    },
    setproductToAdd: (state, action: PayloadAction<ProductType | undefined>) => {
      state.productToAdd = action.payload;
    }
  }
});

export const {setCurrentPage, setModalIsOpen, setisModalAddToBusketOpen, closeAllModal, setproductToAdd} = appSlice.actions;
