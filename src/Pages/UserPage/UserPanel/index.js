import React from "react";

import connect from "react-redux/es/connect/connect";
import {
  CustomButton,
  CustomSvg,
  CustomUploadWidget,
} from "../../../components";
import { logoutUser } from "../../../store/auth";
import { uploadProfilePicture } from "../../../store/user";
import "./style.scss";

const UserPanel = ({
  fullName,
  email,
  profilePicture,
  handleImageChange,
  dispatch,
}) => {
  return (
    <div className='user-panel'>
      <div className='user-panel-picture-wrapper'>
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
      </div>

      <h3 className='full-name'>{fullName}</h3>
      <h4 className='email'>{email}</h4>

      <CustomButton
        title='Change Password'
        className='change-btn'
        icon={<CustomSvg name='pen' width='24' height='24' />}
      />
      <CustomButton
        title='Exit'
        className='exit-btn'
        onClick={() => {
          dispatch(logoutUser());
        }}
        icon={<CustomSvg name='exit' width='22' height='23' />}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(UserPanel);
