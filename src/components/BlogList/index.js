import React from "react";

import "./style.scss";
import { BlogCard } from "../BlogCard";
import { PageTitle } from "../PageTitle";
import { Loader } from "../Loader";

export const BlogList = ({ blogs, title, loading }) => {
  return (
    <div className='blog-list'>
      <PageTitle title={title} />
      {loading ? (
        <Loader />
      ) : (
        <div className='blog-cards'>
          {blogs.map((blog, ind) => {
            return (
              <div className='card-wrapper' key={ind}>
                <BlogCard
                  cardInfo={blog}
                  className='blog-cards-item'
                  maxLength={window.innerWidth < 1024 ? 50 : 85}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
