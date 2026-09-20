import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { TConstructorState } from '../slices/constructorSlice';

const selectConstructorState = (state: RootState) => state.burgerConstructor;

export const selectBun = createSelector(
  [selectConstructorState],
  (constructorState: TConstructorState) => constructorState.bun
);

export const selectConstructorIngredients = createSelector(
  [selectConstructorState],
  (constructorState: TConstructorState) => constructorState.ingredients
);

export const selectOrderRequest = createSelector(
  [selectConstructorState],
  (constructorState: TConstructorState) => constructorState.orderRequest
);

export const selectOrderModalData = createSelector(
  [selectConstructorState],
  (constructorState: TConstructorState) => constructorState.orderModalData
);
