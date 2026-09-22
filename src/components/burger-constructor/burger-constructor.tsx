import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectBunTop,
  selectConstructorIngredients,
  selectOrderModalData,
  selectOrderRequest
} from '@selectors';
import { clearConstructor, clearOrderModalData, createOrder } from '@slices';
import { selectIsAuth } from '@selectors';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const bun = useSelector(selectBunTop);
  const ingredients = useSelector(selectConstructorIngredients);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const constructorItems = {
    bun: bun,
    ingredients: ingredients
  };

  const onOrderClick = () => {
    if (!bun) return;

    if (!isAuth) {
      navigate('/login');
      return;
    }

    const ingredientsList = [
      bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      bun._id
    ];

    dispatch(createOrder(ingredientsList));
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
    dispatch(clearOrderModalData());
  };

  const price = useMemo(
    () =>
      (bun ? bun.price * 2 : 0) +
      ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [bun, ingredients]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
