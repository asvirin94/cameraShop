import { NameSpace } from '../../consts';
import { StateType } from '../../types/types';

export const getCurrentPage = (state: StateType) => state[NameSpace.App].currentPage;
export const getCurrentSector = (state: StateType) => state[NameSpace.App].currentSector;
