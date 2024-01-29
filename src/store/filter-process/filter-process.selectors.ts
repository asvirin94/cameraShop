import { NameSpace } from '../../consts';
import { StateType } from '../../types/types';

export const getFilterCategory = (state: StateType) => state[NameSpace.Filter].category;
export const getFilterType = (state: StateType) => state[NameSpace.Filter].type;
export const getFilterLevel = (state: StateType) => state[NameSpace.Filter].level;
