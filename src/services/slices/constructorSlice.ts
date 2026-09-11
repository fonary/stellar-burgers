import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

interface ConstructorState {
  bunTop: TConstructorIngredient | null;
  bunBottom: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: { number: number } | null;
}

const initialState: ConstructorState = {
  bunTop: null,
  bunBottom: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    setBun: (
      state,
      action: PayloadAction<{
        bunTop: TConstructorIngredient | null;
        bunBottom: TConstructorIngredient | null;
      }>
    ) => {
      state.bunTop = action.payload.bunTop;
      state.bunBottom = action.payload.bunBottom;
    },
    addIngredients: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.bunTop = action.payload;
        state.bunBottom = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredients: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload
      );
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    setOrderModalData: (
      state,
      action: PayloadAction<{ number: number } | null>
    ) => {
      state.orderModalData = action.payload;
    },
    clearConstructor: (state) => {
      state.bunTop = null;
      state.bunBottom = null;
      state.ingredients = [];
      state.orderModalData = null;
      state.orderRequest = false;
    }
  }
});

export const {
  setBun,
  addIngredients,
  removeIngredients,
  setOrderRequest,
  setOrderModalData,
  clearConstructor
} = constructorSlice.actions;

export default constructorSlice.reducer;
