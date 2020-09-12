import React from "react";
import { BlogList } from "../../components";
import { blogs } from "../../data";

export const New = () => {
  return <BlogList blogs={blogs} title="Latest Blogs" />;
};
