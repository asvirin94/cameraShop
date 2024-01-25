import dayjs from 'dayjs';
import { ProductType } from './types/types';

dayjs.locale('ru');

export const makeMachineDate = (date: string) => dayjs(date).format('YYYY-MM-DD');
export const makeHumanDate = (date: string) => dayjs(date).format('DD MMMM');

export const getSortedProducts = (sortType: string | undefined, sortDirection: string | undefined, products: ProductType[]) => {
  if(sortType === undefined && sortDirection === undefined) {
    return products;
  }

  switch(sortType) {
    case 'price':
      return sortDirection === 'fromLowToHigh'
        ? [...products].sort((a, b) => a.price - b.price)
        : [...products].sort((a, b) => b.price - a.price);
    case 'popularity':
      return sortDirection === 'fromLowToHigh'
        ? [...products].sort((a, b) => a.rating - b.rating)
        : [...products].sort((a, b) => b.rating - a.rating);
    default:
      return products;
  }
};
