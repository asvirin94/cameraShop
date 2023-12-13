import { NameSpace } from '../../consts';
import { StateType } from '../../types/types';

export const getProducts = (state: StateType) => state[NameSpace.Data].products;
