import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';

export type TConstructorState = {
  bunTop: TConstructorIngredient | null;
  bunBottom: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TConstructorState = {
  bunTop: null,
  bunBottom: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bunTop = action.payload;
        state.bunBottom = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredients: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    clearConstructor: (state) => {
      state.bunTop = null;
      state.bunBottom = null;
      state.ingredients = [];
      state.orderModalData = null;
      state.orderRequest = false;
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    setOrderModalData: (state, action: PayloadAction<TOrder | null>) => {
      state.orderModalData = action.payload;
    }
  }
});

export const {
  addIngredient,
  removeIngredients,
  clearConstructor,
  setOrderModalData,
  setOrderRequest
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
