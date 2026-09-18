import { useSelector } from '../../services/store';
import {
  selectIsAuth,
  selectIsAuthChecked
} from '../../services/selectors/userSelectors';
import { Navigate, useLocation } from 'react-router';
import { Preloader } from '../ui/preloader';
import { FC } from 'react';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute: FC<ProtectedRouteProps> = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const isAuth = useSelector(selectIsAuth);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && isAuth) {
    return <Navigate to={location.state?.from || '/'} />;
  }

  if (!onlyUnAuth && !isAuth) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
