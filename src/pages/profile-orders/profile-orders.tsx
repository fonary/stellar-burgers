import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { selectUserOrders } from '@selectors';
import { fetchUserOrders } from '@slices';

export const ProfileOrders: FC = () => {
  const orders = useSelector(selectUserOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  return <ProfileOrdersUI orders={orders} />;
};
