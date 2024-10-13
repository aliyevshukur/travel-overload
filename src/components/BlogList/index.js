import React from "react";

import { BlogCard } from "../BlogCard";
import { Loader } from "../Loader";
import { PageTitle } from "../PageTitle";
import "./style.scss";

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
              <BlogCard
                cardInfo={blog}
                className={"blog-cards-item"}
                maxLength={window.innerWidth < 1024 ? 50 : 85}
                key={ind}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
