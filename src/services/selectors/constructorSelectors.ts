import { RootState } from '../store';

export const selectBunTop = (state: RootState) =>
  state.burgerConstructor.bunTop;

export const selectBunBottom = (state: RootState) =>
  state.burgerConstructor.bunBottom;

export const selectConstructorIngredients = (state: RootState) =>
  state.burgerConstructor.ingredients;
