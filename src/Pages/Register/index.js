import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Eye from "../../assets/eye.svg";
import Cover from "../../assets/register-cover.jpg";
import { CustomButton, InputField } from "../../components";
import { FormMessage } from "../../components/FormMessage";
import { getToken } from "../../store/auth";
import {
  getError,
  getIsSuccess,
  getLoading,
  register,
} from "../../store/register";
import { validateInput } from "../../utils/validateInput";
import "./style.scss";
const mapStateToProps = (state) => ({
  serverError: getError(state),
  loading: getLoading(state),
  isSuccess: getIsSuccess(state),
  token: getToken(state),
});

export const Register = connect(mapStateToProps)(
  ({ isSuccess, serverError, loading, dispatch, token }) => {
    const [userInfo, setUserInfo] = useState({
      name: "",
      surname: "",
      email: "",
      password: "",
    });
    const [inputErrors, setInputErrors] = useState({
      name: "",
      surname: "",
      email: "",
      password: "",
    });

    const [isModified, setIsModified] = useState(false);
    const history = useHistory();

    useEffect(() => {
      if (token) {
        history.push("/new");
      }
    }, [token, history]);

    const onChange = (e) => {
      setIsModified(true);
      const { name, value } = e.target;

      // Update user info
      if (value === null || value === undefined) {
        setUserInfo({ ...userInfo, [name]: "", error: "" });
      } else {
        setUserInfo({ ...userInfo, [name]: value, error: "" });
      }

      // Reset error message of changed input
      // setInputErrors({ ...inputErrors, [name]: false });

      // Check if input is valid
      const inputError = validateInput(name, value);
      setInputErrors({
        ...inputErrors,
        [inputError.input]: inputError.message,
      });

      // console.log(`Error: ${JSON.stringify(inputErrors)}`);
      // console.log(`Server Error: ${JSON.stringify(serverError)}`);
      // console.log(`User Info: ${JSON.stringify(userInfo)}`);
    };

    const onFormSubmit = (e) => {
      e.preventDefault();
      setIsModified(false);
      const nameError = validateInput("name", userInfo.name);
      const surnameError = validateInput("surname", userInfo.surname);
      const emailError = validateInput("email", userInfo.email);
      const passwordError = validateInput("password", userInfo.password);
      setInputErrors({
        ...inputErrors,
        name: nameError.message,
        surname: surnameError.message,
        email: emailError.message,
        password: passwordError.message,
      });

      // console.log(JSON.stringify(userInfo));
      const hasInputError = Object.values(inputErrors).some(
        (value) => value !== "",
      );
      if (!hasInputError) {
        dispatch(register(userInfo));
      }
    };

    return (
      <div className='register'>
        <div className='form-wrapper'>
          <form className='form' onSubmit={(e) => onFormSubmit(e)}>
            <h1 className='title'>
              Welcome to <span className='title-span'>Travel Overload</span>
            </h1>
            {isSuccess && (
              <FormMessage
                text={"Successfully registered, please go to login page"}
                type={"success"}
              />
            )}

            {serverError && (
              <FormMessage text={serverError.message} type={"error"} />
            )}

            {Object.values(inputErrors).map((message, index) => {
              if (message) {
                return <FormMessage text={message} type='error' key={index} />;
              } else return null;
            })}
            <InputField
              fieldName='name'
              name='name'
              className='form-field'
              onChange={(e) => onChange(e)}
              error={inputErrors.name}
              required={true}
            />
            <InputField
              fieldName='surname'
              name='surname'
              className='form-field'
              onChange={(e) => onChange(e)}
              error={inputErrors.surname}
              required={true}
            />
            <InputField
              fieldName='email'
              name='email'
              className='form-field'
              onChange={(e) => onChange(e)}
              error={inputErrors.email}
              required={true}
            />
            <InputField
              fieldName='pasword'
              className='form-field field-last'
              name='password'
              type='password'
              icon={Eye}
              onChange={(e) => onChange(e)}
              error={inputErrors.password}
              required={true}
            />

            <p className='form-text'>
              Already have an account?{" "}
              <Link className='form-text-link' to='/login'>
                Sign in
              </Link>
            </p>
            <CustomButton
              title='Register'
              type='submit'
              loading={loading}
              disabled={!isModified}
              className={"form-button"}
            />
          </form>
        </div>

        <div className='cover-image-wrapper'>
          <img src={Cover} alt='cover' className='cover-image' />
        </div>
      </div>
    );
  },
);
