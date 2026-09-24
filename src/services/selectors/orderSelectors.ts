import { RootState } from '../store';

export const selectUserOrders = (state: RootState) => state.order.orders;

export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;

export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;

export const selectRequestedOrder = (state: RootState) =>
  state.order.requestedOrder;

export const selectRequestedOrderNumber = (state: RootState) =>
  state.order.requestedOrderNumber;

export const selectOrderError = (state: RootState) => state.order.error;

export const selectIsLoading = (state: RootState) => state.order.isLoading;
