import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import "./styles/reset.scss";
import "./App.scss";

import { Navigation } from "./navigation";
import { RenderRoutes, ROUTES } from "./routes";
import { Header } from "./components/Header";
import store from "./store";

function App() {
  const [isNavVisible, setIsNavVisible] = useState();

  useEffect(() => {
    if (window.innerWidth < 850) {
      setIsNavVisible(false);
    }
  }, []);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <Provider store={store}>
      <div className="App">
        <Header toggleNav={toggleNav} />
        <Navigation isNavVisible={isNavVisible} />
        <div className="app-container">
          <RenderRoutes routes={ROUTES} />
        </div>
      </div>
    </Provider>
  );
}

export default App;
