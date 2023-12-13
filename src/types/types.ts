import { store } from '../store';

export type StateType = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type ProductType = {
  id: number;
  name: string;
  vendorCode: string;
  type: 'Коллекционная' | 'Моментальная'|'Цифровая'|'Плёночная';
  category: 'Видеокамера'|'Фотоаппарат';
  description: string;
  level: 'Нулевой'| 'Любительский'|'Профессиональный';
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  };
