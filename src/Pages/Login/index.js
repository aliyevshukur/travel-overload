import React, { useState } from "react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Cover from "../../assets/cover.jpg";
import Eye from "../../assets/eye.svg";
import { CustomButton, InputField } from "../../components";
import "./style.scss";

export const Login = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const history = useHistory();

  const onFormSubmit = (e) => {
    e.preventDefault();
    console.log(`User info ${JSON.stringify(userInfo)}`);
    const url = `${process.env.REACT_APP_API_URL}/auth/login`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.message === "success") {
          localStorage.setItem("token", result.token);
          history.push("/user");
        }
      });
  };

  const onChange = (e) => {
    const { name, value } = e.target;

    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  return (
    <div className='login'>
      <div className='form-wrapper'>
        <form className='form'>
          <h1 className='title'>
            Hello, <span className='title-span'>Welcome back</span>
          </h1>
          <InputField
            fieldName='email'
            name='email'
            className='form-field'
            onChange={(e) => onChange(e)}
          />
          <InputField
            fieldName='password'
            name='password'
            className='form-field'
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
