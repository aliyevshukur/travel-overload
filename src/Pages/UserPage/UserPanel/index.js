import React, { useState } from "react";

import connect from "react-redux/es/connect/connect";
import {
  CustomButton,
  CustomSvg,
  CustomUploadWidget,
} from "../../../components";
import { Loader } from "../../../components/Loader";
import ModalWindow from "../../../components/ModalWindow";
import { logoutUser } from "../../../store/auth";
import {
  changeName,
  changePassword,
  getNameChangeSuccess,
} from "../../../store/user";
import "./style.scss";

const UserPanel = ({
  fullName,
  email,
  profilePicture,
  handleImageChange,
  dispatch,
  profilePictureUploadLoading,
  nameSuccess,
  isPanelVisible,
  setIsPanelVisible,
}) => {
  const [isNameModalOpen, setNameIsModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordIsModalOpen] = useState(false);

  const openModal = (type) => {
    if (type === "password") {
      setPasswordIsModalOpen(true);
    } else if (type === "name") {
      setNameIsModalOpen(true);
    }
  };

  const handleNameChange = (name, surname, password) => {
    dispatch(changeName(name, surname, password));
    if (nameSuccess) {
      setNameIsModalOpen(false);
    }
  };

  const handlePassworChange = (newPassword, oldPassword) => {
    dispatch(changePassword(newPassword, oldPassword));
  };

  return (
    <div className={`user-panel ${isPanelVisible ? "active" : ""}`}>
      {isNameModalOpen && (
        <ModalWindow
          setIsModalOpen={setNameIsModalOpen}
          formType='name'
          title='Change your name'
          onSubmit={(name, surname, password) =>
            handleNameChange(name, surname, password)
          }
        />
      )}
      {isPasswordModalOpen && (
        <ModalWindow
          setIsModalOpen={setPasswordIsModalOpen}
          formType='password'
          title='Change your password'
          onSubmit={(newPassword, oldPassword) =>
            handlePassworChange(newPassword, oldPassword)
          }
        />
      )}
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
        onClick={() => openModal("password")}
      />
      <CustomButton
        title='Change Name'
        className='change-btn'
        icon={<CustomSvg name='pen' width='24' height='24' />}
        onClick={() => openModal("name")}
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
  return {
    nameSuccess: getNameChangeSuccess(state),
  };
};

export default connect(mapStateToProps)(UserPanel);
