import React, { useEffect, useState } from "react";
import { BlogList } from "../../components";
import { blogs } from "../../data";

export const New = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://travel-load.herokuapp.com/post")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((e) => console.log("Error: ", e));
  }, []);
  return <BlogList blogs={data} title="Latest Blogs" />;
};
