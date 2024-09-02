import React from 'react';
import { Route, Redirect } from 'react-router-dom';
/* It is used to check if the user is authenticated */
import { AuthService } from '../../../services/AuthService';

/* Higher-order component (HOC) that takes a Component and other props (...rest) */
const ProtectedRoute = ({ component: Component, ...rest }) => {
  /* Returns the current user if authenticated, or null if not */
  const isLoggedIn = AuthService.currentUserValue() !== null;

  return (
    <Route
      {...rest}
      /* The render function is used to determine what will be displayed on the route */
      render={(props) =>
        /* If isLoggedIn is true, the component passed as a prop is rendered */
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
