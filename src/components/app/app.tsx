import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import styles from './app.module.css';

import {
  AppHeader,
  FeedInfo,
  IngredientDetails,
  Modal,
  OrderInfo
} from '@components';
import { ProtectedRoute } from '../protected-route';
import { useDispatch, useSelector } from '../../services/store';
import { useEffect } from 'react';
import { checkAuth } from '@slices';
import { selectIsAuthChecked } from '@selectors';

const App = () => {
  const dispatch = useDispatch();
  const isAuthChecked = useSelector(selectIsAuthChecked);

  useEffect(() => {
    if (!isAuthChecked) {
      dispatch(checkAuth());
    }
  }, [isAuthChecked, dispatch]);

  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();

  const handleCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={background ?? location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={handleCloseModal}>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='' onClose={handleCloseModal}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal title='' onClose={handleCloseModal}>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
