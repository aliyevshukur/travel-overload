import React from "react";
import { CardAuthor } from "./CardAuthor";
import "./style.scss";

export const BlogCard = ({ cardInfo }) => {
  const { image, title, preview, date, author, authorImage } = cardInfo;
  console.log(cardInfo);
  return (
    <div className="blog-card">
      <img src={image} alt="card" className="blog-card-image" />
      <div className="blog-card-content">
        <div>
          <h2 className="blog-card-title">{title}</h2>
          <h3 className="blog-card-preview">{preview}</h3>
        </div>
        <CardAuthor
          authorInfo={{ date: date, author: author, authorImage: authorImage }}
        />
      </div>
    </div>
  );
};
