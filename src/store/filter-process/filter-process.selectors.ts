import { NameSpace } from '../../consts';
import { StateType } from '../../types/types';

export const getFilterCategory = (state: StateType) => state[NameSpace.Filter].category;
export const getFilterType = (state: StateType) => state[NameSpace.Filter].type;
export const getFilterLevel = (state: StateType) => state[NameSpace.Filter].level;
export const getMinPrice = (state: StateType) => state[NameSpace.Filter].price.min;
export const getMaxPrice = (state: StateType) => state[NameSpace.Filter].price.max;
