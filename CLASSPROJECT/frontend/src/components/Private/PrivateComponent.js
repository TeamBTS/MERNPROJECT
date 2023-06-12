import React from 'react'
import {Navigate, Outlet} from "react-router-dom";
import {isUserLoggedIn} from "../../helpers/AuthHelper";

const PrivateComponent = () => {
    const currentUserStatus = isUserLoggedIn();

  return (
    currentUserStatus ? <Outlet /> : <Navigate to="/signup" />
  )
}

export default PrivateComponent;
