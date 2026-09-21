import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TConstructorState } from '../slices/constructorSlice';

const selectConstructorState = (state: RootState) => state.burgerConstructor;

export const selectBunTop = createSelector(
  [selectConstructorState],
  (constructorState: TConstructorState) => constructorState.bunTop
);

export const selectBunBottom = createSelector(
  [selectConstructorState],
  (constructorState: TConstructorState) => constructorState.bunBottom
);

export const selectConstructorIngredients = createSelector(
  [selectConstructorState],
  (constructorState: TConstructorState) => constructorState.ingredients
);
