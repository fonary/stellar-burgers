import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { UserState } from '../slices/userSlice';

const selectUserState = (state: RootState) => state.user;

export const selectUser = createSelector(
  [selectUserState],
  (userState: UserState) => userState.user
);

export const selectIsAuth = createSelector(
  [selectUserState],
  (userState: UserState) => userState.isAuthenticated
);

export const selectUserLoading = createSelector(
  [selectUserState],
  (userState: UserState) => userState.isLoading
);

export const selectUserError = createSelector(
  [selectUserState],
  (userState: UserState) => userState.errors
);
