import React, { useState, useEffect } from "react";
import "./styles/reset.scss";
import "./App.scss";

import { Navigation } from "./navigation";
import { RenderRoutes, ROUTES } from "./routes";
import { Header } from "./components/Header";

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
    <div className="App">
      <Header toggleNav={toggleNav} />
      <Navigation isNavVisible={isNavVisible} />
      <div className="app-container">
        <RenderRoutes routes={ROUTES} />
      </div>
    </div>
  );
}

export default App;
