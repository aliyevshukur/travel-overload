import React, { useEffect, useState } from "react";
import { BlogList } from "../../components";
import { blogs } from "../../data";

export const New = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://travel-load.herokuapp.com/post")
      .then((res) => {
        console.log("Response", res);
        return res.json();
      })
      .then((result) => {
        console.log("data", result);
        setData(result);
      });
  }, []);
  return <BlogList blogs={data} title="Latest Blogs" />;
};
