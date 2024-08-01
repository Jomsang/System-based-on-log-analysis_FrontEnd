import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ logOn, element, restricted }) => {
  console.log("logOn: ", logOn);
  console.log("element: ", element);
  console.log("restricted: ", restricted);
  return logOn && restricted ? <Navigate to="/login" /> : element;
};

export default PublicRoute;