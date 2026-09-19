import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IngredientsState } from '../slices/ingredientsSlice';

const selectIngredientsState = (state: RootState) => state.ingredients;

export const selectIngredients = createSelector(
  [selectIngredientsState],
  (ingredientsState: IngredientsState) => ingredientsState.items
);

export const selectIngredientsLoading = createSelector(
  [selectIngredientsState],
  (ingredientsState: IngredientsState) => ingredientsState.isLoading
);

export const selectIngredientsError = createSelector(
  [selectIngredientsState],
  (ingredientsState: IngredientsState) => ingredientsState.error
);
