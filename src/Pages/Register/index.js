import React, { useState, useEffect } from "react";

import "./style.scss";
import Eye from "../../assets/eye.svg";
import Cover from "../../assets/register-cover.jpg";
import { CustomButton, InputField } from "../../components";
import { ErrorBox } from "../../components/ErrorBox";

export const Register = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: "",
  });

  useEffect(() => {}, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, password } = userInfo;
    console.log("userInfo", userInfo);

    const nameRegex = /^[a-z]+$/i;
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^[a-z0-9]+$/i;

    if (firstName.length <= 2 || !nameRegex.test(firstName)) {
      setUserInfo({
        ...userInfo,
        error:
          "Length of the first name must be greater than 2 and please use only letters.",
      });
      return;
    }

    if (lastName.length <= 2 || !nameRegex.test(lastName)) {
      setUserInfo({
        ...userInfo,
        error:
          "Length of the surname must be greater than 2 and please use only letters.",
      });
      return;
    }

    if (email.length <= 5 || !emailRegex.test(email)) {
      setUserInfo({
        ...userInfo,
        error: "Email structure is wrong!",
      });
      return;
    }

    if (password.length <= 5 || !passwordRegex.test(password)) {
      setUserInfo({
        ...userInfo,
        error:
          "Length of password must be greater than 5 and please use only numbers and letters.",
      });
      return;
    }

    setUserInfo({ ...userInfo, error: "" });

    fetch("https://travel-load.herokuapp.com/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json)
      .then((result) => console.log(result));
  };

  return (
    <div className="register-container">
      <div className="content">
        <form className="login-form">
          <h1 className="title">
            Welcome to <span className="title-span">Travel Overload</span>
          </h1>
          {userInfo.error && <ErrorBox text={userInfo.error} />}
          <InputField
            fieldName="name"
            name="firstName"
            className="form-field form-field-first"
            onChange={(e) => onChange(e)}
          />
          <InputField
            fieldName="surname"
            name="lastName"
            className="form-field"
            onChange={(e) => onChange(e)}
          />
          <InputField
            fieldName="email"
            name="email"
            className="form-field"
            onChange={(e) => onChange(e)}
          />
          <InputField
            fieldName="pasword"
            className="form-field"
            name="password"
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
