import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./styles/reset.scss";
import "./App.scss";

import { Navigation } from "./navigation";
import { RenderRoutes, ROUTES } from "./routes";
import { Header } from "./components/Header";
import { isTabletMode, setIsTabletMode } from "./store/appState";

const mapStateToProps = (store) => ({
  isTabletMode: isTabletMode(store),
});

const mapDispatchToProps = (dispatch) => {
  return {
    setIsTabletMode: (value) => dispatch(setIsTabletMode(value)),
  };
};

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ isTabletMode, setIsTabletMode }) => {
  const [isNavVisible, setIsNavVisible] = useState();
  useEffect(() => {
    if (isTabletMode) {
      setIsNavVisible(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = () => {
    if (window.innerWidth < 850) {
      setIsTabletMode(true);
    } else {
      setIsTabletMode(false);
    }
  };
  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div className="App">
      <Header toggleNav={toggleNav} />
      <Navigation
        isTabletMode={isTabletMode}
        setIsTabletMode={setIsTabletMode}
        isNavVisible={isNavVisible}
        setIsNavVisible={setIsNavVisible}
      />
      <div className="app-container">
        <RenderRoutes routes={ROUTES} />
      </div>
    </div>
  );
});

export default App;
