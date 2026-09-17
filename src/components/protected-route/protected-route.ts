import { useSelector } from '../../services/store';
import {
  selectIsAuth,
  selectUser,
  selectUserLoading
} from '../../services/selectors/userSelectors';
import { Navigate, useLocation } from 'react-router';

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuth);
  const isLoading = useSelector(selectUserLoading);
  const user = useSelector(selectUser);
  const location = useLocation();

  return children;
};
