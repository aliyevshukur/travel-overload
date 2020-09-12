import React from "react";
import { BlogCard } from "../BlogCard";
import { PageTitle } from "../PageTitle";
import "./style.scss";

export const BlogList = ({ blogs, title }) => {
  return (
    <div className="blog-list">
      <PageTitle title={title} />
      <div className="blog-cards">
        {blogs.map((blog) => (
          <div className="card-wrapper">
            <BlogCard cardInfo={blog} className="blog-cards-item" />
          </div>
        ))}
      </div>
    </div>
  );
};