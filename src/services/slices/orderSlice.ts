import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getOrdersApi, orderBurgerApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

type TCreateOrderPayload = {
  number: number;
  orders: TOrder[];
};

type TOrderState = {
  orders: TOrder[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orders: [],
  orderRequest: false,
  orderModalData: null,
  isLoading: false,
  error: null
};

export const fetchUserOrders = createAsyncThunk(
  'order/fetchUserOrders',
  async () => getOrdersApi()
);

export const createOrder = createAsyncThunk<TCreateOrderPayload, string[]>(
  'order/createOrder',
  async (ingredientsIds) => {
    const created = await orderBurgerApi(ingredientsIds);
    const orders = await getOrdersApi();

    return {
      number: created.order.number,
      orders
    };
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModalData: (state) => {
      state.orderModalData = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Загрузка списка заказов пользователя
      .addCase(fetchUserOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Ошибка загрузки заказов';
      })
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orders = action.payload.orders;
        state.orderModalData =
          action.payload.orders.find(
            (order) => order.number === action.payload.number
          ) ?? null;
      })
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
        state.error = 'Ошибка оформления заказа';
      });
  }
});

export const { clearOrderModalData } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
