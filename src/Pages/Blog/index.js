import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Eye from "../../assets/eye.svg";
import { BlogCard } from "../../components";
import { CardAuthor } from "../../components/BlogCard/CardAuthor";
import { Loader } from "../../components/Loader";
import { fetchBlogs, getBlogs, increaseView } from "../../store/blogs";
import { fetchBlog, getBlog, isLoading } from "../../store/single-blog";
import "./style.scss";

const mapStateToProps = (state) => ({
  blog: getBlog(state),
  blogs: getBlogs(state),
  loading: isLoading(state),
});

export const Blog = connect(mapStateToProps)(
  ({ blog, blogs, loading, dispatch }) => {
    const { id } = useParams();
    const {
      title = "",
      author = {},
      postDate = "",
      context = [],
      views = 0,
    } = blog;

    useEffect(() => {
      increaseView(id);
    }, []); // eslint-disable-line

    useEffect(() => {
      dispatch(fetchBlog(id));
      dispatch(fetchBlogs("newest"));
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
      <div className='blog-wrapper'>
        <div className='blog'>
          <div className='blog-header'>
            <img src={context[1].url} alt='' className={"blog-header-image"} />
            <div className='blog-header-info'>
              <h1 className='blog-header-info-title'>{title}</h1>
              <p className='blog-header-info-description'>{context[2].text}</p>
              <div className='blog-header-info-views'>
                <img
                  src={Eye}
                  alt='eye'
                  className='blog-header-info-views-eye'
                />
                {views}
              </div>
            </div>
          </div>
          <div className='blog-content'>
            {context.slice(2).map((field, ind) => {
              if (field.type === "text") {
                return (
                  <div className='blog-content-text' key={ind}>
                    {field.text}
                  </div>
                );
              } else if (field.type === "image") {
                return (
                  <img
                    src={field.url}
                    alt=''
                    className='blog-content-image'
                    key={ind}
                  />
                );
              } else return <></>;
            })}
          </div>
          <div className='blog-author'>
            <CardAuthor
              authorInfo={{
                postDate: postDate,
                author: author.name + " " + author.surname,
                authorImage: author.profilePicture,
              }}
            />
          </div>
        </div>
        <div className='sidepanel'>
          <h3 className='sidepanel-title'>Recent posts</h3>
          {blogs.map((blog, ind) => (
            <BlogCard cardInfo={blog} mini={true} key={ind} />
          ))}
        </div>
      </div>
    );
  },
);
