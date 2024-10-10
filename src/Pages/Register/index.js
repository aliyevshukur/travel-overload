import React, { useEffect, useState } from "react";

import Eye from "../../assets/eye.svg";
import Cover from "../../assets/register-cover.jpg";
import { CustomButton, InputField } from "../../components";
import { ErrorBox } from "../../components/ErrorBox";
import "./style.scss";

export const Register = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    error: "",
  });
  const [isSuccess, setIsSuccess] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value, error: "" });
  };

  const checkInputs = (firstName, lastName, email, password) => {
    const nameRegex = /^[a-z]+$/i;
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const passwordRegex = /^[a-z0-9]+$/i;

    if (firstName.length <= 2) {
      setUserInfo({
        ...userInfo,
        error: "Length of the first name must be greater than 2.",
      });
      return;
    }

    if (!nameRegex.test(firstName)) {
      setUserInfo({
        ...userInfo,
        error: "Name must consist of only letters.",
      });
      return;
    }

    if (lastName.length <= 2) {
      setUserInfo({
        ...userInfo,
        error: "Length of the surname must be greater than 2 .",
      });
      return;
    }

    if (!nameRegex.test(lastName)) {
      setUserInfo({
        ...userInfo,
        error: "Surname must consist of only letters.",
      });
      return;
    }

    if (!email.toLowerCase().match(emailRegex)) {
      setUserInfo({
        ...userInfo,
        error: "Email structure is wrong!",
      });
      return;
    }

    if (password.length <= 5 || !passwordRegex.test(password)) {
      setUserInfo({
        ...userInfo,
        error: "Length of password must be greater than 5.",
      });
      return;
    }

    if (!passwordRegex.test(password)) {
      setUserInfo({
        ...userInfo,
        error: "Password must consist of only numbers and letters.",
      });
      return;
    }
  };
  const onFormSubmit = (e) => {
    e.preventDefault();

    const { name, surname, email, password } = userInfo;
    checkInputs(name, surname, email, password);
    console.log("userInfo", userInfo);

    if (userInfo.error) return;

    const url = `${process.env.REACT_APP_API_URL}/auth/register`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, surname, email, password }),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.message === "success") {
          setIsSuccess(true);
        } else {
          setUserInfo({ ...userInfo, error: result.message });
          setIsSuccess(false);
        }
        console.log(result);
      });
  };

  return (
    <div className='register'>
      <div className='form-wrapper'>
        <form className='form'>
          <h1 className='title'>
            Welcome to <span className='title-span'>Travel Overload</span>
          </h1>
          {userInfo.error && <ErrorBox text={userInfo.error} />}
          {isSuccess && (
            <ErrorBox
              text={"User created successfully, please go to login page"}
              type='success'
            />
          )}
          <InputField
            fieldName='name'
            name='name'
            className='form-field form-field-first'
            onChange={(e) => onChange(e)}
          />
          <InputField
            fieldName='surname'
            name='surname'
            className='form-field'
            onChange={(e) => onChange(e)}
          />
          <InputField
            fieldName='email'
            name='email'
            className='form-field'
            onChange={(e) => onChange(e)}
          />
          <InputField
            fieldName='pasword'
            className='form-field'
            name='password'
            type='password'
            icon={Eye}
            onChange={(e) => onChange(e)}
          />
          <CustomButton title='Login' onClick={(e) => onFormSubmit(e)} />
        </form>
      </div>

      <div className='cover-image-wrapper'>
        <img src={Cover} alt='cover' className='cover-image' />
      </div>
    </div>
  );
};
