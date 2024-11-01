import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { BlogCard, PageTitle } from "../../components";
import { Loader } from "../../components/Loader";
import ModalWindow from "../../components/ModalWindow";
import {
  changeName,
  changePassword,
  fetchUserBlogs,
  getNameChangeSuccess,
  getProfilePictureUploadError,
  getProfilePictureUploadLoading,
  getUser,
  getUserBlogs,
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

  nameSuccess: getNameChangeSuccess(store),
});

export const UserPage = connect(mapStateToProps)(
  ({
    dispatch,
    user,
    profilePictureUploadLoading,
    profilePictureUploadError,
    blogsLoading,
    blogs,
    nameSuccess,
  }) => {
    const [isPanelVisible, setIsPanelVisible] = useState(false);
    const [isNameModalOpen, setIsNameModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

    useEffect(() => {
      dispatch(fetchUserBlogs());
    }, [dispatch]);

    useEffect(() => {
      if (profilePictureUploadError) {
        toast.error(profilePictureUploadError);
      }
    }, [profilePictureUploadError]);

    function handleImageChange(imageUrl) {
      dispatch(uploadProfilePicture(imageUrl));
    }

    const handleNameChange = (name, surname, password) => {
      dispatch(changeName(name, surname, password));
      if (nameSuccess) {
        setIsNameModalOpen(false);
      }
    };

    const handlePassworChange = (newPassword, oldPassword) => {
      dispatch(changePassword(newPassword, oldPassword));
    };
    return (
      <div className='user-page-wrapper'>
        {isPanelVisible && (
          <div
            className='translucent-layer'
            onClick={() => setIsPanelVisible(false)}
          />
        )}
        {isNameModalOpen &&
          createPortal(
            <ModalWindow
              setIsModalOpen={setIsNameModalOpen}
              formType='name'
              title='Change your name'
              onSubmit={handleNameChange}
            />,
            document.getElementById("portal"),
          )}
        {isPasswordModalOpen &&
          createPortal(
            <ModalWindow
              setIsModalOpen={setIsPasswordModalOpen}
              formType='password'
              title='Change your password'
              onSubmit={handlePassworChange}
            />,
            document.getElementById("portal"),
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
          setIsPasswordModalOpen={setIsPasswordModalOpen}
          setIsNameModalOpen={setIsNameModalOpen}
        />
      </div>
    );
  },
);
