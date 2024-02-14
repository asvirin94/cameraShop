import { NameSpace } from '../../consts';
import { StateType } from '../../types/types';

export const getCurrentPage = (state: StateType) => state[NameSpace.App].currentPage;
export const getIsModalOpen = (state: StateType) => state[NameSpace.App].isModalOpen;
export const getIsModalAddToBasketOpen = (state: StateType) => state[NameSpace.App].isModalAddToBasketOpen;
export const getIsModalNewReviewSuccess = (state: StateType) => state[NameSpace.App].isModalNewReviewSuccessOpen;
export const getProductToAdd = (state: StateType) => state[NameSpace.App].productToAdd;
export const getIsModalAddReviewOpen = (state: StateType) => state[NameSpace.App].isModalAddReviewOpen;
export const getproductOnPage = (state: StateType) => state[NameSpace.App].productOnPage;
export const getFilteredAndSortedProducts = (state: StateType) => state[NameSpace.App].filteredAndSortedProducts;
export const getIsModalAddToBasketSuccessOpen = (state: StateType) => state[NameSpace.App].isModalAddToBasketSuccessOpen;
export const getProductsInBasket = (state: StateType) => state[NameSpace.App].productsInBasket;
export const getProductsInBasketPrice = (state: StateType) => state[NameSpace.App].productsInBusketPrice;
