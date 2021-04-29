import React from "react";
import { connect } from "react-redux";

import { CardAuthor } from "./CardAuthor";
import "./style.scss";
import { isTabletMode } from "../../store/appState";

const mapStateToProps = (store) => ({
  isTabletMode: isTabletMode(store),
});

export const BlogCard = connect(mapStateToProps)(
  ({ cardInfo, className = "", isTabletMode }) => {
    const { image, title, postDate, author, authorImage } = cardInfo;
    let { context } = cardInfo;
    let maxLength = 90;

    if (isTabletMode) {
      maxLength = 50;
    }
    if (context.length > maxLength) {
      context = context.substr(0, maxLength) + "...";
    }

    return (
      <div className={`blog-card ${className}`}>
        <img src={image} alt="card" className="blog-card-image" />
        <div className="blog-card-content">
          <h2 className="blog-card-title">{title}</h2>
          <h3 className="blog-card-context">{context}</h3>
          <CardAuthor
            authorInfo={{
              postDate,
              author: author,
              authorImage: authorImage,
            }}
          />{" "}
        </div>
      </div>
    );
  }
);
