import React, { useState } from "react";

import "./style.scss";
import Eye from "../../assets/eye.svg";
import Cover from "../../assets/cover.jpg";
import { InputField, CustomButton } from "../../components";

export const Login = () => {
  const [userInfo, setUserInfo] = useState({
    email: "murad@test.com",
    password: "password",
  });

  const onFormSubmit = (e) => {
    e.preventDefault();
    fetch("http://travel-load.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json)
      .then((result) => console.log(result));
  };

  const onChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="login-container">
      <div className="content">
        <form className="login-form">
          <h1 className="title">
            Hello, <span className="title-span">Welcome back</span>
          </h1>
          <InputField
            fieldName="email"
            className="form-field"
            onChange={(e) => onChange(e)}
          />
          <InputField
            fieldName="pasword"
            className="form-field"
            type="password"
            icon={Eye}
            onChange={(e) => onChange(e)}
          />

          <CustomButton title="Login" onClick={(e) => onFormSubmit(e)} />
        </form>
      </div>

      <div className="cover-image-wrapper">
        <img src={Cover} alt="cover" className="cover-image" />
      </div>
    </div>
  );
};
