import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ResetPasswordUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { resetPassword } from '@slices';
import { selectUserError, selectUserLoading } from '@selectors';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const loading = useSelector(selectUserLoading);
  const errorText = useSelector(selectUserError).resetPassword;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(resetPassword({ password, token }));
  };

  const isReset = localStorage.getItem('resetPassword') === 'reset';

  useEffect(() => {
    if (!loading && isReset) {
      localStorage.removeItem('resetPassword');
      navigate('/login');
    }
  }, [navigate, isReset]);

  return (
    <ResetPasswordUI
      errorText={errorText ?? ''}
      password={password}
      token={token}
      setPassword={setPassword}
      setToken={setToken}
      handleSubmit={handleSubmit}
    />
  );
};
