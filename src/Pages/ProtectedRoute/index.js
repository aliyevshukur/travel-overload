import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { getToken } from "../../store/auth";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state) => ({
  token: getToken(state),
});

export default connect(mapStateToProps)(ProtectedRoute);
