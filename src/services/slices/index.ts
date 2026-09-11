import { combineReducers } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import userSlice from './userSlice';
import ordersSlice from './orderSlice';
import constructorSlice from './constructorSlice';

export const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  orders: ordersSlice,
  constructor: constructorSlice
  // ingredients: ingredientsSlice,
  // feed: feedSlice
});
