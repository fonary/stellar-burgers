import { selectUser, selectUserError } from '@selectors';
import { getUser, updateUser } from '@slices';
import { useDispatch, useSelector } from '../../services/store';
import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';

export const Profile: FC = () => {
  const user = useSelector(selectUser);
  const updateUserError = useSelector(selectUserError).updateUser;
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    if (user) {
      setFormValue((prevState) => ({
        ...prevState,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser({ name: formValue.name, email: formValue.email }));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name,
        email: user.email,
        password: ''
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      updateUserError={updateUserError ?? ''}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
