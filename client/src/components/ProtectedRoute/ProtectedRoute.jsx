import React, {useContext} from "react";
import { Route, Redirect } from "react-router-dom";

import AuthContext from "../../context/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest}) => {
  const {isLogin} = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={() =>
        isLogin ? (
          <Component/>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default ProtectedRoute;
