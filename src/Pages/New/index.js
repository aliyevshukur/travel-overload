import React, { useEffect } from "react";
import { connect } from "react-redux";

import { BlogList } from "../../components";
import { fetchBlogs, getBlogs, isLoading } from "../../store/blogs";

const mapStateToProps = (state) => ({
  blogs: getBlogs(state),
  loading: isLoading(state),
});

const mapDispatchToProps = () => ({
  fetchBlogs,
});

export const New = connect(mapStateToProps)(({ blogs, loading, dispatch }) => {
  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);
  return <BlogList blogs={blogs} loading={loading} title="Latest Blogs" />;
});
