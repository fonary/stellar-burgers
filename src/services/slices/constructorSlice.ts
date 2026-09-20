import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';

export type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addBun: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.bun = action.payload;
    },
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      state.ingredients.push(action.payload);
    },
    removeIngredient: (state, action: PayloadAction<{ id: string }>) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
      state.orderModalData = null;
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    }
  }
});

export const {
  addBun,
  addIngredient,
  removeIngredient,
  clearConstructor,
  setOrderRequest
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
