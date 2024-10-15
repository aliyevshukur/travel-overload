import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BlogCard, PageTitle } from "../../components";
import { Loader } from "../../components/Loader";
import { getBreakpoints, getWindowWidth } from "../../store/appState";
import { getUser } from "../../store/auth";
import { fetchBlogs, getBlogs, isLoading } from "../../store/blogs";
import {
  getProfilePictureUploadError,
  getProfilePictureUploadLoading,
  getUserInfo,
  uploadProfilePicture,
} from "../../store/user";
import "./style.scss";
import UserPanel from "./UserPanel";
const mapStateToProps = (store) => ({
  breakpoints: getBreakpoints(store),
  windowWidth: getWindowWidth(store),
  blogs: getBlogs(store),
  isLoading: isLoading(store),
  user: getUser(store),
  profilePictureUploadLoading: getProfilePictureUploadLoading(store),
  profilePictureUploadError: getProfilePictureUploadError(store),
});

export const UserPage = connect(mapStateToProps)(
  ({
    blogs,
    isLoading,
    dispatch,
    user,
    profilePictureUploadLoading,
    profilePictureUploadError,
  }) => {
    useEffect(() => {
      dispatch(fetchBlogs());
      // dispatch(getUserInfo());
    }, [dispatch]);

    function handleImageChange(imageUrl) {
      dispatch(uploadProfilePicture(imageUrl, user.userId));
    }
    // console.log(`User ${JSON.stringify(user)}`);
    if (profilePictureUploadError) {
      console.log(`Profile picture upload error :${profilePictureUploadError}`);
    }
    if (isLoading) {
      return (
        <div className='user-page-wrapper'>
          <div className='user-page'>
            <div className='user-page-blog-list'>
              <Loader />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='user-page-wrapper'>
        <div className='user-page'>
          <div className='user-page-header'>
            <PageTitle title='Your posts' />
            <div className='picture-wrapper'>
              <img src={user.profilePicture} alt='' className='user-picture' />
            </div>
          </div>
          <div className='user-page-blog-list'>
            {blogs.map((item, ind) => {
              return (
                <BlogCard
                  key={ind}
                  cardInfo={item}
                  className='user-page-blog-list-item'
                />
              );
            })}
          </div>
        </div>
        <UserPanel
          profilePicture={user.profilePicture}
          fullName={user.name + " " + user.surname}
          email={user.email}
          userId={user.userId}
          handleImageChange={handleImageChange}
        />
      </div>
    );
  },
);
