import { createAsyncThunk } from '@reduxjs/toolkit';
import { Id, ProductType, Promos } from '../types/types';
import { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

export const loadProductsAction = createAsyncThunk<
  ProductType[],
  undefined,
   {
    extra: AxiosInstance;
   }
>('loadProducts', async(_arg, {extra: api}) => {
  try {
    const {data} = await api.get<ProductType[]>('cameras');
    return data;
  } catch (error) {
    toast.warn('Не получилось загрузить данные :( Пожалуйста, попробуйте чуть позднее');
    throw error;
  }

});

export const loadPromosAction = createAsyncThunk<
Promos,
undefined,
{
  extra: AxiosInstance;
}
>('loadPromos', async(_arg, {extra: api}) => {
  const {data} = await api.get<Promos>('promo');
  return data;
});

export const loadSimilarProductsAction = createAsyncThunk<
  ProductType[],
  Id,
  {
    extra: AxiosInstance;
  }
>('loadSimilarproducts', async(id, {extra: api}) => {
  const {data} = await api.get<ProductType[]>(`cameras/${id}/similar`);
  return data;
});
