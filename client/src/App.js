import React from "react";
import { Route, Switch } from "react-router-dom";

import { Header, Footer, ProtectedRoute } from "./components";
import AuthContext from "./context/AuthContext";
import useAuth from "./hooks/auth";

import routes from "./routes/routes";
import "./App.scss";

const App = () => {
  const { login, logout, token, id, isReady } = useAuth();
  const isLogin = !!token;

  return (
    <AuthContext.Provider
      value={{ login, logout, token, id, isReady, isLogin }}
    >
      <div className="all-content">
        <Header />
        <Switch>
          {routes.map((route, index) =>
            route.withAuth ? (
              <ProtectedRoute
                path={route.path}
                key={index}
                component={route.component}
                exact
              />
            ) : (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={() => <route.component />}
              />
            )
          )}
        </Switch>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
};

export default App;
