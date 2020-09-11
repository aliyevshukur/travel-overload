import React from "react";
import "./styles/reset.scss";
import "./App.scss";

import { Navigation } from "./navigation";
import { RenderRoutes, ROUTES } from "./routes";
import { BlogCard } from "./components/";

const cardInfo = {
  image:
    "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80",
  title: "Gəncədə bir gün",
  preview:
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur",
  author: "Shukur Aliyev",
  date: new Date(),
  authorImage:
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=635&q=80",
};

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className="app-container">
        <BlogCard cardInfo={cardInfo} />
        {/* <RenderRoutes routes={ROUTES} /> */}
      </div>
    </div>
  );
}

export default App;
