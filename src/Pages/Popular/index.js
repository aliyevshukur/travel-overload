import React from "react";

import { blogs } from "../../data";
import { BlogList } from "../../components";

export const Popular = () => {
  return <BlogList blogs={blogs} title="Popular Blogs" />;
};
