import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import { Blog, Login, New, Popular, Register } from "./Pages";
import Create from "./Pages/Create";
import Notfound from "./Pages/Notfound";
import ProtectedRoute from "./Pages/ProtectedRoute";
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
    protected: true,
  },
  {
    path: "/user",
    key: "USER",
    component: UserPage,
    protected: true,
  },
  {
    path: "/blogs/:id",
    key: "BLOGS:ID",
    component: Blog,
  },
];

const RouteWithSubRoutes = (route) => {
  if (route.protected) {
    return (
      <ProtectedRoute
        path={route.path}
        exact={route.exact}
        component={route.component}
      />
    );
  } else {
    return (
      <Route
        path={route.path}
        exact={route.exact}
        render={(props) => <route.component {...props} routes={route.routes} />}
      />
    );
  }
};

export const RenderRoutes = ({ routes }) => {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <Notfound />} />
    </Switch>
  );
};

export default ROUTES;
