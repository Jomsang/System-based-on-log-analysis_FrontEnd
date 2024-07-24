import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import isLogin from 'views/common/isLogin';

const PrivateRoute = () => {
  return isLogin() ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;