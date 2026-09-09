import {
  getUserApi,
  registerUserApi,
  loginUserApi,
  TLoginData,
  TRegisterData,
  forgotPasswordApi,
  resetPasswordApi,
  logoutApi
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { setCookie } from '../../utils/cookie';

type AuthErrors = {
  login: string | null;
  register: string | null;
  forgotPassword: string | null;
  resetPassword: string | null;
};

const defaultErrors: AuthErrors = {
  login: null,
  register: null,
  forgotPassword: null,
  resetPassword: null
};

const defaultRegisterFormData: TRegisterData = {
  email: '',
  name: '',
  password: ''
};

const defaultLoginFormData: TLoginData = {
  email: '',
  password: ''
};

interface AuthState {
  isAuthenticated: boolean;
  user: TUser | null;
  loginForm: TLoginData;
  registerForm: TRegisterData;
  errors: AuthErrors;
  loading: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loginForm: defaultLoginFormData,
  registerForm: defaultRegisterFormData,
  errors: defaultErrors,
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginForm: (state, action: PayloadAction<TLoginData>) => {
      state.loginForm = action.payload;
    },
    setRegisterForm: (state, action: PayloadAction<TRegisterData>) => {
      state.registerForm = action.payload;
    },
    clearErrors: (state) => {
      state.errors = defaultErrors;
    },
    logoutUser: (state) => {
      localStorage.removeItem('refreshToken');
      setCookie('accessToken', '');
      state.isAuthenticated = false;
      state.user = null;
      state.loginForm = defaultLoginFormData;
      state.registerForm = defaultRegisterFormData;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.errors.login = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        saveAuthData(action.payload.refreshToken, action.payload.accessToken);
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
        state.errors.login = 'Ошибка входа';
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.errors.register = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        saveAuthData(action.payload.refreshToken, action.payload.accessToken);
      })
      .addCase(register.rejected, (state) => {
        state.loading = false;
        state.errors.register = 'Ошибка регистрации';
      })
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.errors.forgotPassword = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state) => {
        (state.loading = false),
          (state.errors.forgotPassword = 'Ошибка при восстановлении пароля');
      })
      .addCase(resetPassword.pending, (state) => {
        (state.loading = true), (state.errors.resetPassword = null);
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state) => {
        (state.loading = false),
          (state.errors.resetPassword = 'Ошибка сброса пароля');
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem('refreshToken');
        setCookie('accessToken', '');
        state.isAuthenticated = false;
        state.user = null;
        state.loginForm = defaultLoginFormData;
        state.registerForm = defaultRegisterFormData;
        state.errors = defaultErrors;
        state.loading = false;
      });
  }
});

export const { setLoginForm, setRegisterForm, clearErrors, logoutUser } =
  authSlice.actions;
export default authSlice.reducer;
