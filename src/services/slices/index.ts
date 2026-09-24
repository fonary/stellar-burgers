export {
  userReducer,
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  getUser,
  updateUser,
  checkAuth
} from './userSlice';

export { ingredientsReducer, fetchIngredients } from './ingredientsSlice';

export {
  constructorReducer,
  addIngredient,
  removeIngredients,
  setIngredients,
  clearConstructor
} from './constructorSlice';

export {
  orderReducer,
  createOrder,
  fetchUserOrders,
  clearOrderModalData,
  clearRequestedOrder,
  fetchOrderByNumber
} from './orderSlice';

export { feedReducer, fetchFeed } from './feedSlice';
