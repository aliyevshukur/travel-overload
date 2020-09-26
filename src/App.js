import React from "react";

import "./reset.scss";
import "./App.scss";

import { Login, Register, Create } from "./Pages";

import { Navigation } from "./navigation";

function App() {
  return (
    <div className="App">
      {/* <Login /> */}
      {/* <Register /> */}
      <Navigation />
      {/* <div className={"main-layout"}> */}
        {
          // Container for all layout
        }
      {/* </div> */}
    </div>
  );
}

export default App;
