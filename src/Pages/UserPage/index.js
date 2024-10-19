import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BlogCard, PageTitle } from "../../components";
import { Loader } from "../../components/Loader";
import { isTabletMode } from "../../store/appState";
import {
  fetchUserBlogs,
  getProfilePictureUploadError,
  getProfilePictureUploadLoading,
  getUser,
  getUserBlogs,
  getUserBlogsError,
  getUserBlogsLoading,
  uploadProfilePicture,
} from "../../store/user";
import "./style.scss";
import UserPanel from "./UserPanel";

const mapStateToProps = (store) => ({
  user: getUser(store),

  profilePictureUploadLoading: getProfilePictureUploadLoading(store),
  profilePictureUploadError: getProfilePictureUploadError(store),

  blogs: getUserBlogs(store),
  blogsLoading: getUserBlogsLoading(store),
  blogsError: getUserBlogsError(store),

  isTabletMode: isTabletMode(store),
});

export const UserPage = connect(mapStateToProps)(
  ({
    dispatch,
    user,
    profilePictureUploadLoading,
    profilePictureUploadError,
    blogsLoading,
    blogsError,
    blogs,
    isTabletMode,
  }) => {
    const [isPanelVisible, setIsPanelVisible] = useState(false);

    useEffect(() => {
      dispatch(fetchUserBlogs());
    }, [dispatch]);

    useEffect(() => {
      if (profilePictureUploadError) {
        console.log(
          `Profile picture upload error :${profilePictureUploadError}`,
        );
        alert(profilePictureUploadError);
      }
    }, [profilePictureUploadError]);
    console.log(`User blogs ${JSON.stringify(blogs)}`);
    function handleImageChange(imageUrl) {
      dispatch(uploadProfilePicture(imageUrl));
    }
    // console.log(`User ${JSON.stringify(user)}`);
    if (profilePictureUploadError) {
      console.log(`Profile picture upload error :${profilePictureUploadError}`);
    }

    return (
      <div className='user-page-wrapper'>
        {isPanelVisible && (
          <div
            className='translucent-layer'
            onClick={() => setIsPanelVisible(false)}
          />
        )}
        <div className='user-page'>
          <div className='user-page-header'>
            <PageTitle title='Your posts' />
            <div
              className='user-page-header-button'
              onClick={() => setIsPanelVisible(!isPanelVisible)}
            >
              <img src={user.profilePicture} alt='' className='user-picture' />
            </div>
          </div>
          <div className='user-page-blog-list'>
            {!blogsLoading ? (
              blogs.length !== 0 ? (
                blogs.map((item, ind) => {
                  return (
                    <BlogCard
                      key={ind}
                      cardInfo={item}
                      className='user-page-blog-list-item'
                    />
                  );
                })
              ) : (
                <p>No posts</p>
              )
            ) : (
              <Loader />
            )}
          </div>
        </div>
        <UserPanel
          profilePicture={user.profilePicture}
          fullName={user.name + " " + user.surname}
          email={user.email}
          userId={user.userId}
          handleImageChange={handleImageChange}
          profilePictureUploadLoading={profilePictureUploadLoading}
          isPanelVisible={isPanelVisible}
          setIsPanelVisible={setIsPanelVisible}
        />
      </div>
    );
  },
);
