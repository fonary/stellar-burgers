import { getUserApi, updateUserApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

interface UserState {
  data: TUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null
};

export const fetchUser = createAsyncThunk('user/fetchUser', async () =>
  getUserApi()
);
export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TUser>) => updateUserApi(data)
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка загрузки профиля';
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка обновления профиля';
      });
  }
});

export const { clearUserError } = userSlice.actions;
export default userSlice.reducer;
