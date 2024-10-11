import React, { useEffect, useState } from "react";

import { name } from "@cloudinary/url-gen/actions/namedTransformation";
import { set } from "@cloudinary/url-gen/actions/variable";
import Eye from "../../assets/eye.svg";
import Cover from "../../assets/register-cover.jpg";
import { CustomButton, InputField } from "../../components";
import { FormMessage } from "../../components/FormMessage";
import { validateInputs } from "../../utils/checkInputs";
import "./style.scss";

export const Register = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const [isSuccess, setIsSuccess] = useState(null);
  const [serverMessage, setServerMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputErrors, setInputErrors] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value, error: "" });

    // Reset error message of changed input
    setInputErrors({ ...inputErrors, [name]: false });

    // Check if input is valid
    const error = validateInputs({ [name]: value });
    setInputErrors({ ...inputErrors, [error.input]: error.message });
    console.log(`Error: ${JSON.stringify(inputErrors)}`);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();

    const noError = Object.values(inputErrors).some((value) => value === "");
    //If form fields is valid and no error from server register user
    if (noError) {
      const url = `${process.env.REACT_APP_API_URL}/auth/register`;

      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.message === "success") {
            setIsSuccess(true);
            setServerMessage(
              "User created successfully, please go to login page",
            );
          } else {
            setIsSuccess(false);
            setUserInfo({ ...userInfo, error: result.message });
            setServerMessage(result.message);
          }
        });
    }
  };

  return (
    <div className='register'>
      <div className='form-wrapper'>
        <form className='form' onSubmit={(e) => onFormSubmit(e)}>
          <h1 className='title'>
            Welcome to <span className='title-span'>Travel Overload</span>
          </h1>
          {serverMessage && (
            <FormMessage
              text={serverMessage}
              type={isSuccess ? "success" : "error"}
            />
          )}
          {Object.values(inputErrors).map(
            (message) =>
              message && (
                <FormMessage text={message} type='error' key={message} />
              ),
          )}
          <InputField
            fieldName='name'
            name='name'
            className='form-field'
            onChange={(e) => onChange(e)}
            error={inputErrors.name}
          />
          <InputField
            fieldName='surname'
            name='surname'
            className='form-field'
            onChange={(e) => onChange(e)}
            error={inputErrors.surname}
          />
          <InputField
            fieldName='email'
            name='email'
            className='form-field'
            onChange={(e) => onChange(e)}
            error={inputErrors.email}
          />
          <InputField
            fieldName='pasword'
            className='form-field field-last'
            name='password'
            type='password'
            icon={Eye}
            onChange={(e) => onChange(e)}
            error={inputErrors.password}
          />
          <CustomButton title='Login' type='submit' />
        </form>
      </div>

      <div className='cover-image-wrapper'>
        <img src={Cover} alt='cover' className='cover-image' />
      </div>
    </div>
  );
};
