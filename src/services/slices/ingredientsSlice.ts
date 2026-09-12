import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '../../utils/burger-api';

interface IngredientsState {
  data: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  data: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    ingredientsData: (state) => state.data,
    ingredientsLoading: (state) => state.loading,
    ingredientsError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchIngredients.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка при загрузке ингредиентов';
      });
  }
});

export const { ingredientsData, ingredientsLoading, ingredientsError } =
  ingredientsSlice.selectors;
export default ingredientsSlice.reducer;
