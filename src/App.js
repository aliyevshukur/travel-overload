import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./App.scss";
import "./styles/reset.scss";

import { Header } from "./components/Header";
import Navigation from "./Navigation";
import { RenderRoutes, ROUTES } from "./routes";
import { login } from "./store/auth";

const App = ({ dispatch }) => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Login user if token exists in localstorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("User exists", user);
    if (token) {
      dispatch(login({ token: token, user: user }));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='App'>
      <Header isNavVisible={isNavVisible} setIsNavVisible={setIsNavVisible} />
      <Navigation
        isNavVisible={isNavVisible}
        setIsNavVisible={setIsNavVisible}
      />
      <div className='app-container'>
        <RenderRoutes routes={ROUTES} />
      </div>
    </div>
  );
};

const mapStateToProps = (store) => ({});

export default connect(mapStateToProps)(App);
