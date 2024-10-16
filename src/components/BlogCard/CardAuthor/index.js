import React from "react";
import formatDate from "../../../utils/formatDate";
import "./style.scss";

export const CardAuthor = ({ authorInfo, className }) => {
  const { authorImage, author, postDate } = authorInfo;

  const date = formatDate(new Date(postDate * 1000));

  return (
    <div className={`card-author ${className}`}>
      <img src={authorImage} alt='author' className='author-image' />
      <div className='author-content'>
        <h3 className='author-name'>{author}</h3>
        <h2 className='date'>{date}</h2>
      </div>
    </div>
  );
};
