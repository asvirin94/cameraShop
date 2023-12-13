import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StateType } from '../types/types';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;
