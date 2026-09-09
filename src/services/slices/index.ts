import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './auth';

export const rootReducer = combineReducers({
  auth: authSlice
});
