import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface OrderState {
  list: TOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  list: [],
  loading: false,
  error: null
};

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () =>
  getOrdersApi()
);

export const placeOrder = createAsyncThunk(
  'orders/placeOrder',
  async (ingredients: string[]) => orderBurgerApi(ingredients)
);

export const fetchOrderByNumber = createAsyncThunk(
  'orders/fetchOrderByNumber',
  async (number: number) => getOrderByNumberApi(number)
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка при загрузке заказов';
      })
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(placeOrder.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка оформления заказа';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        const order = action.payload.orders[0];
        if (order) {
          const index = state.list.findIndex(
            (item) => item.number === order.number
          );
          if (index >= 0) {
            state.list[index] = order;
          } else {
            state.list.push(order);
          }
        }
      })
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.loading = false;
        state.error = 'Ошибка загрузки данных о заказе';
      });
  }
});

export const { clearOrderError } = ordersSlice.actions;
export default ordersSlice.reducer;
