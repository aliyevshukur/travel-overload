import React from "react";
import "./styles/reset.scss";
import "./App.scss";

import { Navigation } from "./navigation";
import { RenderRoutes, ROUTES } from "./routes";

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="app-container">
        <RenderRoutes routes={ROUTES} />
      </div>
    </div>
  );
}

export default App;
