import React from "react";

import "./style.scss";
import Eye from "../../assets/eye.svg";
import Google from "../../assets/google.svg";
import Cover from "../../assets/cover.jpg";
import { InputField, CustomButton } from "../../components";

export const Login = () => {
  return (
    <div className="login-container">
      <div className="content">
        <form className="login-form">
          <h1 className="title">
            Hello, <span className="title-span">Welcome back</span>
          </h1>
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
