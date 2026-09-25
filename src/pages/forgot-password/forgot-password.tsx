import { FC, useState, SyntheticEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { selectUserError, selectUserLoading } from '@selectors';
import { forgotPassword } from '@slices';
import { ForgotPasswordUI } from '@ui-pages';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errorText = useSelector(selectUserError).forgotPassword;
  const loading = useSelector(selectUserLoading);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(forgotPassword({ email }));
  };

  const isSent = localStorage.getItem('resetPassword') === 'sent';

  useEffect(() => {
    if (!loading && isSent) {
      localStorage.removeItem('resetPassword');
      navigate('/reset-password');
    }
  }, [navigate, isSent]);

  return (
    <ForgotPasswordUI
      errorText={errorText ?? ''}
      email={email}
      setEmail={setEmail}
      handleSubmit={handleSubmit}
    />
  );
};
