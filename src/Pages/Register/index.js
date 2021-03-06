import React from "react";

import "./style.scss";
import Eye from "../../assets/eye.svg";
import Google from "../../assets/google.svg";
import Cover from "../../assets/register-cover.jpg";
import { CustomButton, InputField } from "../../components";

export const Register = () => {
  return (
    <div className="register-container">
      <div className="content">
        <form className="login-form">
          <h1 className="title">
            Welcome to <span className="title-span">Travel Overload</span>
          </h1>
          <InputField fieldName="name" className="form-field" />
          <InputField fieldName="surname" className="form-field" />
          <InputField fieldName="email" className="form-field" />
          <InputField
            fieldName="pasword"
            className="form-field"
            type="password"
            icon={Eye}
          />
          <CustomButton
            title="Login"
            onClick={() => console.log("login handle ")}
          />
        </form>
      </div>

      <div className="cover-image-wrapper">
        <img src={Cover} alt="cover" className="cover-image" />
      </div>
    </div>
  );
};
