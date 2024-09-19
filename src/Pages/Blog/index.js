import React from "react";
import "./style.scss";
import { CardAuthor } from "../../components/BlogCard/CardAuthor";
import { connect } from "react-redux";
import { useEffect } from "react";
import { getBlogs, fetchBlogs } from "../../store/blogs";
import { fetchBlog, getBlog, isLoading } from "../../store/single-blog";
import { BlogCard, BlogList } from "../../components";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Loader } from "../../components/Loader";

const mapStateToProps = (state) => ({
  blog: getBlog(state),
  blogs: getBlogs(state),
  loading: isLoading(state),
});

export const Blog = connect(mapStateToProps)(
  ({ blog, blogs, loading, dispatch }) => {
    const { id } = useParams();
    const { title, author, authorImage, postDate, context = [] } = blog;
    console.log(`SINGLE BLOG: ${JSON.stringify(blog)}`);
    useEffect(() => {
      dispatch(fetchBlog(id));
      dispatch(fetchBlogs());
    }, [dispatch, id]);

    if (
      loading ||
      (context.length < 3 && blogs.is) ||
      Object.keys(blog).length === 0
    ) {
      return (
        <div className='wrapper-loading'>
          <Loader />
        </div>
      );
    }

    return (
      <div className='wrapper'>
        <div className='blog'>
          <div className='blog-header'>
            <img src={context[1].url} alt='' className={"blog-header-image"} />
            <div className='blog-header-info'>
              <h1 className='blog-header-info-title'>{title}</h1>
              <p className='blog-header-info-description'>{context[2].text}</p>
            </div>
          </div>
          <div className='blog-content'>
            {context.slice(2).map((field) => {
              if (field.type === "text") {
                return <div className='blog-content-text'>{field.text}</div>;
              } else if (field.type === "image") {
                return (
                  <img src={field.url} alt='' className='blog-content-image' />
                );
              }
            })}
          </div>
          <CardAuthor
            authorInfo={{
              postDate: postDate,
              author: author,
              authorImage: authorImage,
            }}
            className={"blog-card-author"}
          />
        </div>
        <div className='side-panel'>
          <h3>Newly posted blogs</h3>
          {blogs.map((blog) => (
            <BlogCard cardInfo={blog} mini={true} />
          ))}
        </div>
      </div>
    );
  },
);
