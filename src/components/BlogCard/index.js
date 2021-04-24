import React from "react";
import { CardAuthor } from "./CardAuthor";
import "./style.scss";

export const BlogCard = ({ cardInfo, className = "" }) => {
  const { image, title, postDate, author, authorImage } = cardInfo;
  let { context } = cardInfo;
  let maxLength = 90;

  if (context.length > maxLength) {
    context = context.substr(0, maxLength) + "...";
  }

  return (
    <div className={`blog-card ${className}`}>
      <img src={image} alt="card" className="blog-card-image" />
      <div className="blog-card-content">
        <div>
          <h2 className="blog-card-title">{title}</h2>
          <h3 className="blog-card-context">{context}</h3>
        </div>
        <CardAuthor
          authorInfo={{ postDate, author: author, authorImage: authorImage }}
        />
      </div>
    </div>
  );
};
