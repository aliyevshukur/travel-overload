import React, { useEffect, useState } from "react";
import { BlogList } from "../../components";
import { blogs } from "../../data";

export const New = () => {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("http://travel-load.herokuapp.com/post").then((res) => {
      console.log("Response", res);
    });
    // .then((result) => setData(result));
    console.log("data", data);
  }, []);

  return <BlogList blogs={blogs} title="Latest Blogs" />;
};
