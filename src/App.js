import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./App.scss";
import "./styles/reset.scss";

import { Header } from "./components/Header";
import Navigation from "./Navigation";
import { RenderRoutes, ROUTES } from "./routes";
import {
  isTabletMode,
  setIsTabletMode,
  setWindowWidth,
} from "./store/appState";

/*************  ✨ Codeium Command ⭐  *************/
/******  f87dd438-09c3-4dd0-af2b-ce49281d503b  *******/
const mapStateToProps = (store) => ({
  isTabletMode: isTabletMode(store),
});

const mapDispatchToProps = (dispatch) => {
  return {
    setIsTabletMode: (value) => dispatch(setIsTabletMode(value)),
    setWindowWidth: (value) => dispatch(setWindowWidth(value)),
  };
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(({ isTabletMode, setIsTabletMode, setWindowWidth }) => {
  const [isNavVisible, setIsNavVisible] = useState();

  useEffect(() => {
    if (isTabletMode) {
      setIsNavVisible(false);
    }

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth < 768) {
        setIsTabletMode(true);
      } else {
        setIsTabletMode(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isTabletMode, setIsTabletMode, setWindowWidth]);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div className='App'>
      <Header
        toggleNav={toggleNav}
        isTabletMode={isTabletMode}
        isNavVisible={isNavVisible}
        setIsNavVisible={setIsNavVisible}
      />
      <Navigation
        isTabletMode={isTabletMode}
        setIsTabletMode={setIsTabletMode}
        isNavVisible={isNavVisible}
        setIsNavVisible={setIsNavVisible}
      />
      <div className='app-container'>
        <RenderRoutes routes={ROUTES} />
      </div>
    </div>
  );
});

export default App;
