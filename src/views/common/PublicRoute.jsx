import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ logOn, element, restricted }) => {
  console.log("PublicRoute logOn?: ", logOn);
  console.log("PublicRoute element?: ", element);
  console.log("PublicRoute restricted?: ", restricted);
  return logOn && restricted ? <Navigate to="/mainLogOut" /> : element;
};

export default PublicRoute;