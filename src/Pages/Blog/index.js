import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import Eye from "../../assets/eye.svg";
import { CustomButton, CustomSvg } from "../../components";
import { CardAuthor } from "../../components/BlogCard/CardAuthor";
import { Loader } from "../../components/Loader";
import {
  deleteBlog,
  getDeleteBlogError,
  getDeleteBlogPending,
  getDeleteBlogSuccess,
  increaseView,
} from "../../store/blogs";
import { fetchBlog, getBlog, isLoading } from "../../store/single-blog";
import { getUser } from "../../store/user";
import ModalDelete from "../Create/components/ModalDelete/ModalDelete";
import Sidepanel from "./Sidepanel";
import "./style.scss";

const mapStateToProps = (state) => ({
  blog: getBlog(state),
  loading: isLoading(state),
  user: getUser(state),
  deleteBlogPending: getDeleteBlogPending(state),
  deleteBlogError: getDeleteBlogError(state),
  deleteBlogSuccess: getDeleteBlogSuccess(state),
});

export const Blog = connect(mapStateToProps)(
  ({ dispatch, blog, loading, user, deleteBlogPending, deleteBlogError }) => {
    const { id } = useParams();
    const history = useHistory();
    const {
      title = "",
      author = {},
      postDate = "",
      context = [],
      views = 0,
    } = blog;
    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {
      increaseView(id);
    }, []); // eslint-disable-line

    useEffect(() => {
      dispatch(fetchBlog(id));
    }, [dispatch, id]);

    function handleBlogDelete() {
      dispatch(deleteBlog(id));

      // Show feedback on blog deletion
      if (deleteBlogError?.message) toast.error(deleteBlogError.message);
      else toast.success("Successfully deleted blog");

      history.push("/");
    }

    return (
      <div className='blog-wrapper'>
        <div className='blog'>
          {loading || Object.keys(blog).length === 0 ? (
            <Loader />
          ) : (
            <>
              <div className='blog-controls'>
                <CustomButton
                  title='Back'
                  onClick={() => history.goBack()}
                  className={"blog-controls-back"}
                  loading={deleteBlogPending}
                  icon={
                    <CustomSvg
                      name='chervonLeft'
                      width='20'
                      height='20'
                      color='#ffffff'
                    />
                  }
                />
                {(user._id === blog.author._id || user.role === "admin") && (
                  <div className='blog-controls-delete'>
                    <CustomButton
                      title=''
                      onClick={() => setDeleteModal(true)}
                      className={"blog-controls-delete-btn"}
                      icon={
                        <CustomSvg
                          name='trash'
                          width='24'
                          height='24'
                          color='red'
                        />
                      }
                    />
                    {deleteModal && (
                      <ModalDelete
                        onDelete={handleBlogDelete}
                        setDeleteModal={setDeleteModal}
                        className={"blog-controls-delete-modal"}
                        bubbleTail={"top-right"}
                        id={id}
                      />
                    )}
                  </div>
                )}
              </div>
              <div className='blog-header'>
                <img
                  src={context[1].url}
                  alt=''
                  className={"blog-header-image"}
                />
                <div className='blog-header-info'>
                  <h1 className='blog-header-info-title'>{title}</h1>
                  <p className='blog-header-info-description'>
                    {context[2].text}
                  </p>
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
                {context.slice(3).map((field, ind) => {
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
              <CardAuthor
                authorInfo={{
                  postDate: postDate,
                  author: author.name + " " + author.surname,
                  authorImage: author.profilePicture,
                }}
                className={"blog-author"}
              />
            </>
          )}
        </div>
        <Sidepanel />
      </div>
    );
  },
);
