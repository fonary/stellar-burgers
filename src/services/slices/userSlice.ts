import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie, deleteCookie } from '../../utils/cookie';
import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  TRegisterData,
  TLoginData,
  resetPasswordApi,
  forgotPasswordApi,
  getUserApi,
  updateUserApi
} from '@api';

type ErrorsUser = {
  login: string | null;
  register: string | null;
  forgotPassword: string | null;
  resetPassword: string | null;
  getUser: string | null;
  updateUser: string | null;
  logout: string | null;
};

export type UserState = {
  user: TUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  errors: ErrorsUser;
};

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  errors: {
    login: null,
    register: null,
    forgotPassword: null,
    resetPassword: null,
    getUser: null,
    updateUser: null,
    logout: null
  }
};

const saveToken = (refreshToken: string, accessToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
  setCookie('accessToken', accessToken);
};

const deleteToken = () => {
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
};

export const register = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
);

export const login = createAsyncThunk('user/login', async (data: TLoginData) =>
  loginUserApi(data)
);

export const forgotPassword = createAsyncThunk(
  'user/forgotPassword',
  async (data: { email: string }) => forgotPasswordApi(data)
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);

export const getUser = createAsyncThunk('auth/getUser', async () =>
  getUserApi()
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (data: Partial<TRegisterData>) => updateUserApi(data)
);

export const logout = createAsyncThunk('user/logout', async () => logoutApi());

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.errors.register = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        saveToken(action.payload.refreshToken, action.payload.accessToken);
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.errors.register = 'Регистрация не удалась';
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.errors.login = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        saveToken(action.payload.refreshToken, action.payload.accessToken);
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.errors.login = 'Неверный логин или пароль';
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
        state.errors.logout = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.errors.logout = null;
        deleteToken();
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.errors.logout = 'Ошибка выхода';
        deleteToken();
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
        state.errors.getUser = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(getUser.rejected, (state) => {
        state.isLoading = false;
        state.errors.getUser = 'Ошибка получения данных пользователя';
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.errors.updateUser = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state) => {
        state.isLoading = false;
        state.errors.updateUser = 'Ошибка обновления профиля';
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.errors.forgotPassword = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.isLoading = false;
        state.errors.forgotPassword = 'Ошибка отправки письма';
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.errors.resetPassword = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isLoading = false;
        state.errors.resetPassword = 'Ошибка сброса пароля';
      });
  }
});

export const userReducer = userSlice.reducer;
