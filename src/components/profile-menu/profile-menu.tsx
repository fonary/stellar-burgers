import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { logout } from '@slices';
import { selectIsAuth } from '@selectors';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
