import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { Header } from "./components/Header";
import Navigation from "./Navigation";
import { RenderRoutes, ROUTES } from "./routes";
import { login, setToken } from "./store/auth";
import { fetchUser, getUser } from "./store/user";
import "./styles/reset.scss";

const App = ({ dispatch }) => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Login user if token exists in localstorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    // console.log("User exists");
    if (token) {
      dispatch(fetchUser());
      dispatch(setToken(token));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='App'>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
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
