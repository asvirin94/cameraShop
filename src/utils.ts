import dayjs from 'dayjs';
import { ProductType } from './types/types';

dayjs.locale('ru');

export const makeMachineDate = (date: string) =>
  dayjs(date).format('YYYY-MM-DD');
export const makeHumanDate = (date: string) => dayjs(date).format('DD MMMM');

export const makeFiltrationAndSorting = (
  products: ProductType[],
  category: string | undefined,
  type: string[],
  level: string[],
  minPrice?: string | undefined,
  maxPrice?: string | undefined,
  sortType?: string | undefined,
  sortDirection?: string | undefined,
) => {
  let result = [...products];

  const categoryTranslate =
    category === 'video' ? 'Видеокамера' : 'Фотоаппарат';

  const getTypeTranslate = (product: ProductType) => {
    switch (product.type) {
      case 'Коллекционная':
        return 'collection';
      case 'Моментальная':
        return 'snapshot';
      case 'Цифровая':
        return 'digital';
      case 'Плёночная':
        return 'film';
      default:
        return 'error';
    }
  };

  const getLevelTranslate = (product: ProductType) => {
    switch (product.level) {
      case 'Нулевой':
        return 'zero';
      case 'Любительский':
        return 'non-professional';
      case 'Профессиональный':
        return 'professional';
      default:
        return 'error';
    }
  };

  if (category) {
    result = result.filter((product) => product.category === categoryTranslate);
  }

  if (type.length > 0) {
    result = result.filter((product) => {
      const productType = getTypeTranslate(product);
      return type.includes(productType);
    });
  }

  if (level.length > 0) {
    result = result.filter((product) => {
      const productLevel = getLevelTranslate(product);
      return level.includes(productLevel);
    });
  }

  if (minPrice) {
    result = result.filter((product) => product.price >= +minPrice);
  }

  if(maxPrice) {
    result = result.filter((product) => product.price <= +maxPrice);
  }

  if (sortType === undefined && sortDirection === undefined) {
    return result;
  }

  switch (sortType) {
    case 'price':
      return sortDirection === 'fromLowToHigh'
        ? [...result].sort((a, b) => a.price - b.price)
        : [...result].sort((a, b) => b.price - a.price);
    case 'popularity':
      return sortDirection === 'fromLowToHigh'
        ? [...result].sort((a, b) => a.rating - b.rating)
        : [...result].sort((a, b) => b.rating - a.rating);
    default:
      return result;
  }
};
