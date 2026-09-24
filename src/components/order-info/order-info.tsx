import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectFeedOrders,
  selectIngredients,
  selectRequestedOrder,
  selectRequestedOrderNumber
} from '@selectors';
import { fetchOrderByNumber } from '@slices';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();

  const feedOrders = useSelector(selectFeedOrders);
  const ingredients = useSelector(selectIngredients);
  const requestedOrder = useSelector(selectRequestedOrder);
  const requestedOrderNumber = useSelector(selectRequestedOrderNumber);
  const dispatch = useDispatch();

  const currentOrder = feedOrders.find(
    (order) => order.number === Number(number)
  );

  useEffect(() => {
    if (!currentOrder && number && requestedOrderNumber !== Number(number)) {
      dispatch(fetchOrderByNumber(Number(number)));
    }
  }, [currentOrder, number, requestedOrderNumber, dispatch]);

  const orderData = currentOrder ?? requestedOrder;

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
