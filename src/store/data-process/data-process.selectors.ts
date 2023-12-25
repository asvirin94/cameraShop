import { NameSpace } from '../../consts';
import { StateType } from '../../types/types';

export const getProducts = (state: StateType) => state[NameSpace.Data].products;
export const getPromos = (state: StateType) => state[NameSpace.Data].promos;
export const getSimilarProducts = (state: StateType) => state[NameSpace.Data].similarProducts;
