import { RootState } from '../store';

export const selectUser = (state: RootState) => state.user.user;

export const selectIsAuth = (state: RootState) => state.user.isAuthenticated;

export const selectUserLoading = (state: RootState) => state.user.isLoading;

export const selectUserError = (state: RootState) => state.user.errors;

export const selectIsAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;
