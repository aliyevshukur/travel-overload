import React, { useEffect } from "react";
import connect from "react-redux/es/connect/connect";
import { BlogCard } from "../../../components";
import { Loader } from "../../../components/Loader";
import { fetchBlogs, getBlogs } from "../../../store/blogs";
import "./style.scss";

function Sidepanel({ dispatch, blogs }) {
  useEffect(() => {
    if (blogs.length === 0 || blogs === null) {
      dispatch(fetchBlogs("newest"));
    }
  }, []);

  return (
    <div className='sidepanel'>
      {blogs.length === 0 ? (
        <Loader />
      ) : (
        <>
          <h3 className='sidepanel-title'>Recent posts</h3>
          {blogs.map((blog, ind) => (
            <BlogCard cardInfo={blog} mini={true} key={ind} />
          ))}
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  blogs: getBlogs(state),
});

export default connect(mapStateToProps)(Sidepanel);
