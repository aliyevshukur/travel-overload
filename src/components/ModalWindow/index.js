import React, { useEffect, useState } from "react";
import connect from "react-redux/es/connect/connect";
import {
  changePassword,
  getNameChangeError,
  getNameChangeLoading,
  getNameChangeSuccess,
  getPasswordChangeError,
  getPasswordChangeLoading,
  getPasswordChangeSuccess,
  getUser,
  nameChangeError,
  passwordChangeError,
} from "../../store/user";
import { validateInput } from "../../utils/validateInput";
import { CustomButton } from "../CustomButton";
import { FormMessage } from "../FormMessage";
import { InputField } from "../InputField";
import "./style.scss";

function ModalWindow({
  setIsModalOpen,
  title = "Chage your password",
  formType = "password",
  onSubmit,
  dispatch,
  user,
  nameError,
  nameLoading,
  nameSuccess,
  passwordError,
  passwordLoading,
  passwordSuccess,
}) {
  // console.log(`Password success ${passwordSuccess}`);
  // console.log(`Password errror ${passwordError}`);
  const [nameFieldValues, setNameFieldValues] = useState({
    name: "",
    surname: "",
    password: "",
  });

  const [passwordFieldValues, setPasswordFieldValues] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [inputError, setInputError] = useState("");
  const [serverError, setServerError] = useState("");
  const [serverSuccess, setServerSuccess] = useState("");

  const passwordFields = [
    {
      id: 0,
      type: "password",
      name: "oldPassword",
      placeholder: "Old password",
    },
    {
      id: 1,
      type: "password",
      name: "newPassword",
      placeholder: "New password",
    },
    {
      id: 2,
      type: "password",
      name: "confirmPassword",
      placeholder: "Confirm password",
    },
  ];
  const nameFields = [
    { id: 0, type: "text", name: "name" },
    { id: 1, type: "text", name: "surname" },
    {
      id: 2,
      type: "password",
      name: "password",
    },
  ];

  const fields = formType === "name" ? nameFields : passwordFields;

  useEffect(() => {
    if (nameError) {
      setServerError(nameError);
    } else if (passwordError) {
      setServerError(passwordError);
    } else {
      setServerError("");
    }

    if (nameSuccess) {
      setServerSuccess(nameSuccess);
    } else if (passwordSuccess) {
      setServerSuccess(passwordSuccess);
    } else {
      setServerSuccess("");
    }
  }, [nameError, passwordError, nameSuccess, passwordSuccess]);

  const closeModal = (e) => {
    if (e.currentTarget === e.target) {
      if (formType === "name") {
        dispatch(nameChangeError(null));
      }

      if (formType === "password") {
        dispatch(passwordChangeError(null));
      }

      setIsModalOpen(false);
    }
  };

  const validateNameFields = () => {
    const nameError = validateInput("name", nameFieldValues.name);
    if (nameError.message) {
      setInputError(nameError.message);
      return false;
    }
    const surnameError = validateInput("surname", nameFieldValues.surname);
    if (surnameError.message) {
      setInputError(surnameError.message);
      return false;
    }

    if (!nameFieldValues.password) {
      setInputError("Password is required");
      return false;
    }

    setInputError("");
    return true;
  };

  const validatePasswordFields = () => {
    const passwordError = validateInput(
      "password",
      passwordFieldValues.newPassword,
    );
    if (passwordError.message) {
      setInputError(passwordError.message);
      return false;
    }

    if (
      passwordFieldValues.newPassword !== passwordFieldValues.confirmPassword
    ) {
      setInputError("Passwords do not match");
      return false;
    }

    setInputError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formType === "name") {
      if (!validateNameFields()) {
        return;
      }
    } else if (formType === "password") {
      if (!validatePasswordFields()) {
        return;
      }
    }

    // console.log(
    //   `Fetched ${
    //     (nameFieldValues.name,
    //     nameFieldValues.surname,
    //     nameFieldValues.password)
    //   }`,
    // );

    // console.log(
    //   `Fetched ${
    //     passwordFieldValues.oldPassword + " " + passwordFieldValues.newPassword
    //   }`,
    // );

    if (formType === "name") {
      onSubmit(
        nameFieldValues.name,
        nameFieldValues.surname,
        nameFieldValues.password,
      );
    } else if (formType === "password") {
      onSubmit(
        passwordFieldValues.newPassword,
        passwordFieldValues.oldPassword,
      );
    }
  };

  const onChange = (e) => {
    if (formType === "name") {
      setNameFieldValues({
        ...nameFieldValues,
        [e.target.name]: e.target.value,
      });
    } else if (formType === "password") {
      setPasswordFieldValues({
        ...passwordFieldValues,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className='modalwindow' onClick={(e) => closeModal(e)}>
      <form className='modalwindow-content' onSubmit={(e) => handleSubmit(e)}>
        <h2 className='modalwindow-title'>{title}</h2>
        {serverError && <FormMessage text={serverError} />}
        {inputError && <FormMessage text={inputError} />}
        {serverSuccess && <FormMessage text={serverSuccess} type='success' />}
        {fields.map((field) => (
          <InputField
            key={field.id}
            fieldName={field.name}
            placeholder={field.placeholder}
            name={field.name}
            type={field.type}
            className={"modalwindow-input"}
            onChange={(e) => onChange(e)}
          />
        ))}
        <CustomButton
          title='Save'
          type='submit'
          className={"modalwindow-button"}
          loading={passwordLoading || nameLoading}
        />
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: getUser(state),
    nameLoading: getNameChangeLoading(state),
    nameError: getNameChangeError(state),
    nameSuccess: getNameChangeSuccess(state),
    passwordLoading: getPasswordChangeLoading(state),
    passwordError: getPasswordChangeError(state),
    passwordSuccess: getPasswordChangeSuccess(state),
  };
};

export default connect(mapStateToProps)(ModalWindow);
