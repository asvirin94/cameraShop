import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductType } from '../types/types';
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
