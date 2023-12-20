import { NameSpace } from '../../consts';
import { StateType } from '../../types/types';

export const getCurrentPage = (state: StateType) => state[NameSpace.App].currentPage;
export const getIsModalOpen = (state: StateType) => state[NameSpace.App].isModalOpen;
export const getIsModalAddToBusketOpen = (state: StateType) => state[NameSpace.App].isModalAddToBusketOpen;
export const getProductToAdd = (state: StateType) => state[NameSpace.App].productToAdd;
