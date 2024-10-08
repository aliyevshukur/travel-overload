import React, { useState, useRef } from "react";

import "./style.scss";

export const InputField = ({
  fieldName,
  type,
  icon,
  className,
  name,
  onChange,
}) => {
  const [fieldType, setFieldType] = useState(type);
  const inputRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  const togglePassword = () => {
    inputRef.current.focus();

    if (fieldType === "text") {
      setFieldType("password");
    } else {
      setFieldType("text");
    }
  };

  // Prevent label to restore it's position if input has any value
  const handleBlur = (e) => {
    if (e.target.value === "") {
      setIsFocused(false);
    } else {
      setIsFocused(true);
    }
  };

  const handleFocus = (e) => {
    setIsFocused(true);
  };

  return (
    <div className={`field-wrapper ${className}`}>
      <input
        type={fieldType ? fieldType : "text"}
        className={`field ${isFocused && "focused-field"}`}
        name={name}
        id={fieldName}
        onFocus={handleFocus}
        onBlur={handleBlur}
        ref={inputRef}
        onChange={onChange}
      />
      <label
        className={`field-label ${isFocused && "focused-field"}`}
        htmlFor={fieldName}
      >
        {fieldName}
      </label>
      {icon && (
        <div
          onClick={togglePassword}
          className="field-icon-wrapper"
          id={fieldName}
        >
          <img src={icon} alt="input icon" />
        </div>
      )}{" "}
    </div>
  );
};
