import React, { useState } from "react";

import { connect } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Cover from "../../assets/cover.jpg";
import Eye from "../../assets/eye.svg";
import { CustomButton, InputField } from "../../components";
import { FormMessage } from "../../components/FormMessage";
import { getToken, getUser, login } from "../../store/auth";
import "./style.scss";

const mapStateToProps = (state) => ({
  token: getToken(state),
  user: getUser(state),
});

export const Login = connect(mapStateToProps)(({ dispatch, token, user }) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const history = useHistory();
  const [serverMessage, setServerMessage] = useState("");
  // console.log(`USER: ${JSON.stringify(user)}`);
  // console.log(`TOKEN: ${JSON.stringify(token)}`);
  const onFormSubmit = (e) => {
    e.preventDefault();
    // console.log(`User info ${JSON.stringify(userInfo)}`);
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
        // console.log(result);
        if (result.message === "success") {
          dispatch(login({ token: result.token, user: result.user }));
          localStorage.setItem("token", result.token);
          localStorage.setItem("user", JSON.stringify(result.user));
          history.push("/user");
        } else {
          setServerMessage(result.message);
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
        <form className='form' onSubmit={(e) => onFormSubmit(e)}>
          <h1 className='title'>
            Hello, <span className='title-span'>Welcome back</span>
          </h1>
          {serverMessage && <FormMessage text={serverMessage} />}
          <InputField
            fieldName='email'
            name='email'
            className='form-field'
            onChange={(e) => onChange(e)}
          />
          <InputField
            fieldName='password'
            name='password'
            className='field-last'
            type='password'
            icon={Eye}
            onChange={(e) => onChange(e)}
          />

          <CustomButton title='Login' type='submit' />
        </form>
      </div>

      <div className='cover-image-wrapper'>
        <img src={Cover} alt='cover' className='cover-image' />
      </div>
    </div>
  );
});
