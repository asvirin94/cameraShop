import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';
import { ProductInBasket, ProductType } from '../../types/types';

type InitialStateType = {
  currentPage: number;
  productOnPage: ProductType | undefined;
  productToAdd: ProductType | undefined;
  isModalOpen: boolean;
  isModalAddToBasketOpen: boolean;
  isModalAddReviewOpen: boolean;
  isModalNewReviewSuccessOpen: boolean;
  isModalAddToBasketSuccessOpen: boolean;
  isModalOrderSendOpen: boolean;
  isModalRemoveItemOpen: boolean;
  filteredAndSortedProducts: ProductType[];
  productsInBasketData: ProductInBasket[];
  promoCodes: string[];
  promoCode: string | null;
  isPromoCodeApplied: boolean | null;
  removingItemId: number | null;
};

export const appInitialState: InitialStateType = {
  currentPage: 0,
  productOnPage: undefined,
  productToAdd: undefined,
  isModalOpen: false,
  isModalAddToBasketOpen: false,
  isModalAddReviewOpen: false,
  isModalRemoveItemOpen: false,
  isModalNewReviewSuccessOpen: false,
  isModalAddToBasketSuccessOpen: false,
  isModalOrderSendOpen: false,
  filteredAndSortedProducts: [],
  productsInBasketData: [],
  promoCodes: ['camera-333', 'camera-444', 'camera-555'],
  promoCode: null,
  isPromoCodeApplied: null,
  removingItemId: null
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
      state.isModalOrderSendOpen = false;
      state.isModalRemoveItemOpen = false;
      state.removingItemId = null;
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
    setIsModalOrderOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalOrderSendOpen = action.payload;
    },
    setFilteredAndSortedProducts: (state, action: PayloadAction<ProductType[]>) => {
      state.filteredAndSortedProducts = action.payload;
    },
    addProductInBasketData: (state, action: PayloadAction<ProductInBasket>) => {
      state.productsInBasketData.push(action.payload);
      localStorage.setItem('basketData', JSON.stringify(state.productsInBasketData));
    },
    chandeProductInBasketCount: (state, action: PayloadAction<ProductInBasket>) => {
      const productDataToChangeIndex = state.productsInBasketData.findIndex((item) => item.id === action.payload.id);
      state.productsInBasketData[productDataToChangeIndex].count = state.productsInBasketData[productDataToChangeIndex].count + action.payload.count;
      localStorage.setItem('basketData', JSON.stringify(state.productsInBasketData));
    },
    setProductInBasketCount: (state, action: PayloadAction<ProductInBasket>) => {
      const productDataToChangeIndex = state.productsInBasketData.findIndex((item) => item.id === action.payload.id);
      state.productsInBasketData[productDataToChangeIndex].count = action.payload.count;
      localStorage.setItem('basketData', JSON.stringify(state.productsInBasketData));
    },
    removeProductFromBasket: (state, action: PayloadAction<number>) => {
      state.productsInBasketData = state.productsInBasketData.filter((product) => product.id !== action.payload);
      localStorage.setItem('basketData', JSON.stringify(state.productsInBasketData));
    },
    checkIsPromoCodeCorrect: (state, action: PayloadAction<string>) => {
      if(state.promoCodes.includes(action.payload)) {
        state.isPromoCodeApplied = true;
        state.promoCode = action.payload;
      } else {
        state.isPromoCodeApplied = false;
      }
    },
    clearBasket: (state) => {
      state.productsInBasketData = [];
      localStorage.removeItem('basketData');
    },
    setIsModalRemoveItemOpen: (state, action: PayloadAction<boolean>) => {
      state.isModalRemoveItemOpen = action.payload;
    },
    setRemovingItemId: (state, action: PayloadAction<number| null>) => {
      state.removingItemId = action.payload;
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
  addProductInBasketData,
  chandeProductInBasketCount,
  setProductInBasketCount,
  removeProductFromBasket,
  checkIsPromoCodeCorrect,
  setIsModalRemoveItemOpen,
  setIsModalOrderOpen,
  clearBasket,
  setRemovingItemId
} = appSlice.actions;
