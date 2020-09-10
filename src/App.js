import React from "react";

import "./reset.scss";
import "./App.scss";

import { Login, Register } from "./Pages";

function App() {
  return (
    <div className="App">
      <Login />
      {/* <Register /> */}
    </div>
  );
}

export default App;
