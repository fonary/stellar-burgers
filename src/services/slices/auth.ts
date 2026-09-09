import {
  getUserApi,
  registerUserApi,
  loginUserApi,
  refreshToken,
  TLoginData,
  TRegisterData,
  forgotPasswordApi,
  resetPasswordApi,
  logoutApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from 'src/utils/cookie';

interface AuthState {
  isAuthenticated: boolean;
  user: TUser | null;
  loginForm: { email: string; password: string };
  registerForm: { email: string; name: string; password: string };
  errors: {
    login: string | null;
    register: string | null;
    forgotPassword: string | null;
    resetPassword: string | null;
  };
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loginForm: { email: '', password: '' },
  registerForm: { email: '', name: '', password: '' },
  errors: {
    login: null,
    register: null,
    forgotPassword: null,
    resetPassword: null
  },
  loading: false
};

const saveAuthData = (refreshToken: string, accessToken: string) => {
  localStorage.setItem('refreshToken', refreshToken);
  setCookie('accessToken', accessToken);
};

export const fetchUser = createAsyncThunk('auth/fetchUser', async () =>
  getUserApi()
);
export const login = createAsyncThunk('auth/login', async (data: TLoginData) =>
  loginUserApi(data)
);
export const register = createAsyncThunk(
  'auth/register',
  async (data: TRegisterData) => registerUserApi(data)
);
export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (data: { email: string }) => forgotPasswordApi(data)
);
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);
export const logout = createAsyncThunk('auth/logout', async () => logoutApi());
