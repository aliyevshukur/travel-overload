import React from "react";
import "./styles/reset.scss";
import "./App.scss";

import { Navigation } from "./navigation";
import { RenderRoutes, ROUTES } from "./routes";
import { HeroCards, ThumbnailCard } from "./components";
import { blogs } from "./data";

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="app-container">
        {/* <RenderRoutes routes={ROUTES} /> */}
        <HeroCards cardsData={blogs} largeCards={[0]} />
      </div>
    </div>
  );
}

export default App;
