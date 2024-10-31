import React from "react";

import connect from "react-redux/es/connect/connect";
import {
  CustomButton,
  CustomSvg,
  CustomUploadWidget,
} from "../../../components";
import { Loader } from "../../../components/Loader";
import { logoutUser } from "../../../store/auth";
import "./style.scss";

const UserPanel = ({
  fullName,
  email,
  profilePicture,
  handleImageChange,
  dispatch,
  profilePictureUploadLoading,
  isPanelVisible,
  setIsPasswordModalOpen,
  setIsNameModalOpen,
}) => {
  return (
    <div className={`user-panel ${isPanelVisible ? "active" : ""}`}>
      <div className='user-panel-picture-wrapper'>
        {profilePictureUploadLoading ? (
          <Loader />
        ) : (
          <>
            <img
              src={profilePicture}
              alt='User profile'
              className='user-panel-picture'
            />
            <CustomUploadWidget
              handleImageChange={handleImageChange}
              className='profile-upload-btn'
              showPreview={false}
            />
          </>
        )}
      </div>

      <h3 className='full-name'>{fullName}</h3>
      <h4 className='email'>{email}</h4>

      <CustomButton
        title='Change Password'
        className='change-btn'
        icon={<CustomSvg name='pen' width='24' height='24' />}
        onClick={() => setIsPasswordModalOpen(true)}
      />
      <CustomButton
        title='Change Name'
        className='change-btn'
        icon={<CustomSvg name='pen' width='24' height='24' />}
        onClick={() => setIsNameModalOpen(true)}
      />
      <CustomButton
        title='Log out'
        className='logout-btn'
        onClick={() => {
          dispatch(logoutUser());
        }}
        icon={<CustomSvg name='exit' width='22' height='22' />}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(UserPanel);
