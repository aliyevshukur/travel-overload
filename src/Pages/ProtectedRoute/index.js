import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import { getToken } from "../../store/auth";

const ProtectedRoute = ({ token, component: Component, ...rest }) => (
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

const mapStateToProps = (state) => ({
  token: getToken(state),
});

export default connect(mapStateToProps)(ProtectedRoute);
