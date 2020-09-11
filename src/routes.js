import React from "react";
import { Link, Route, Switch } from "react-router-dom";

import { Login, Register } from "./Pages";

export const ROUTES = [
  {
    path: "/",
    key: "ROOT",
    exact: true,
    component: () => <Link to="login">Home</Link>,
  },
  {
    path: "/login",
    key: "LOGIN",
    component: Login,
  },

  {
    path: "/register",
    key: "REGISTER",
    component: Register,
  },
];

const RouteWithSubRoutes = (route) => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
};

export const RenderRoutes = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
};

export default ROUTES;
