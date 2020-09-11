import React from "react";
import "./style.scss";

export const CardAuthor = ({ authorInfo }) => {
  const { authorImage, author, date } = authorInfo;

  const dateString = [date.getDate(), date.getMonth(), date.getYear()].join(
    "."
  );

  return (
    <div className="card-author">
      <img src={authorImage} alt="author" className="author-image" />
      <div className="author-content">
        <h3 className="author-name">{author}</h3>
        <h2 className="date">{dateString}</h2>
      </div>
    </div>
  );
};
