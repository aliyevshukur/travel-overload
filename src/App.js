import React from "react";

import "./reset.scss";
import "./App.scss";

import { Login, Register } from "./Pages";

import { Navigation } from "./navigation";

function App() {
  return (
    <div className="App">
      {/* <Register /> */}
      <Navigation />
      <div className={"main-layout"}>
        <Login />
        {
          // Container for all layout
        }
      </div>
    </div>
  );
}

export default App;
