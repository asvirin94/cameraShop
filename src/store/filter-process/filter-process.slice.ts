import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../consts';

type InitialState = {
  category: string | undefined;
  type: string[];
  level: string[];
  price: {
    min: string | undefined;
    max: string | undefined;
  };
}

const filterInitialState: InitialState = {
  category: undefined,
  type: [],
  level: [],
  price: {
    min: undefined,
    max: undefined
  }
};

export const filterSlice = createSlice({
  name: NameSpace.Filter,
  initialState: filterInitialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      if(state.category === action.payload) {
        state.category = undefined;
        state.type = [];
        state.level = [];
      } else {
        state.category = action.payload;
        state.type = [];
        state.level = [];
      }
    },
    setType: (state, action: PayloadAction<string>) => {
      if(state.type.includes(action.payload)) {
        state.type = state.type.filter((item) => item !== action.payload);
      } else {
        state.type = [...state.type, action.payload];
      }
    },
    setLevel: (state, action: PayloadAction<string>) => {
      if(state.level.includes(action.payload)) {
        state.level = state.level.filter((item) => item !== action.payload);
      } else {
        state.level = [...state.level, action.payload];
      }
    },
    resetFilters: (state) => {
      state.category = undefined;
      state.type = [];
      state.level = [];
      state.price.min = undefined;
      state.price.max = undefined;
    },
    setMinPrice: (state, action: PayloadAction<string | undefined>) => {
      state.price.min = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<string | undefined>) => {
      state.price.max = action.payload;
    }
  }
});

export const {setCategory, setType, setLevel, resetFilters, setMinPrice, setMaxPrice} = filterSlice.actions;
