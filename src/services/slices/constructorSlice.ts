import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

export type TConstructorState = {
  bunTop: TConstructorIngredient | null;
  bunBottom: TConstructorIngredient | null;
  isLoading: boolean;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bunTop: null,
  bunBottom: null,
  isLoading: false,
  ingredients: []
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
    setIngredients: (
      state,
      action: PayloadAction<TConstructorIngredient[]>
    ) => {
      state.ingredients = action.payload;
    },
    clearConstructor: (state) => {
      state.bunTop = null;
      state.bunBottom = null;
      state.ingredients = [];
    }
  }
});

export const {
  addIngredient,
  removeIngredients,
  clearConstructor,
  setIngredients
} = constructorSlice.actions;

export const constructorReducer = constructorSlice.reducer;
