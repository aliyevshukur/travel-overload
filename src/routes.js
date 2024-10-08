import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Login, New, Register, Popular, Create, Blog } from "./Pages";
import { UserPage } from "./Pages/UserPage";

export const ROUTES = [
  {
    path: "/",
    key: "ROOT",
    exact: true,
    component: () => <Redirect to='/login' />,
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
  {
    path: "/new",
    key: "NEW",
    component: New,
  },
  {
    path: "/popular",
    key: "POPULAR",
    component: Popular,
  },
  {
    path: "/create",
    key: "CREATE",
    component: Create,
  },
  {
    path: "/user",
    key: "USER",
    component: UserPage,
  },
  {
    path: "/blogs/:id",
    key: "BLOGS:ID",
    component: Blog,
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
