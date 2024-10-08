import React from "react";
import "./style.scss";

export const CardAuthor = ({ authorInfo, className }) => {
  const { authorImage, author, postDate } = authorInfo;

  // const dateString = [date.getDate(), date.getMonth(), date.getYear()].join(
  // "."
  // );

  return (
    <div className={`card-author ${className}`}>
      <img src={authorImage} alt='author' className='author-image' />
      <div className='author-content'>
        <h3 className='author-name'>{author}</h3>
        <h2 className='date'>{postDate}</h2>
      </div>
    </div>
  );
};
