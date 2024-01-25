import { NameSpace } from '../../consts';
import { StateType } from '../../types/types';

export const getSortType = (state: StateType) => state[NameSpace.Sort].sortType;
export const getSortDirection = (state: StateType) =>state[NameSpace.Sort].sortDirection;
