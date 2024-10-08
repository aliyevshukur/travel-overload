import React from "react";

import "./style.scss";
import { CustomButton, CustomSvg } from "../../../components";

export const UserPanel = ({ fullName, email, profilePicture }) => {
  return (
    <div className="user-panel">
      <div className="picture-wrapper">
        <img src={profilePicture} alt="" className="user-picture" />
      </div>
      <h3 className="full-name">{fullName}</h3>
      <h4 className="email">{email}</h4>
      <CustomButton
        title="Change Password"
        className="change-btn"
        icon={<CustomSvg name="pen" width="24" height="24" />}
      />
      <CustomButton
        title="Exit"
        className="exit-btn"
        icon={<CustomSvg name="exit" width="22" height="23" />}
      />
    </div>
  );
};
