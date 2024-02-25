import { NameSpace } from '../../consts';
import { StateType } from '../../types/types';

export const getProducts = (state: StateType) => state[NameSpace.Data].products;
export const getPromos = (state: StateType) => state[NameSpace.Data].promos;
export const getSimilarProducts = (state: StateType) => state[NameSpace.Data].similarProducts;
export const getReviews = (state: StateType) => state[NameSpace.Data].reviews;
export const getIsProductsLoaded = (state: StateType) => state[NameSpace.Data].isProductsLoaded;
export const getIsOrderSend = (state: StateType) => state[NameSpace.Data].isOrderSend;
export const getErrorMessage = (state: StateType) => state[NameSpace.Data].errorMessage;
