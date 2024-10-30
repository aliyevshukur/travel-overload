import React, { useRef, useState } from "react";

import "./style.scss";

export const InputField = ({
  fieldName,
  type,
  icon,
  className,
  name,
  onChange,
  error = false,
  required = false,
  placeholder,
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
    <>
      <div className={`field-wrapper ${className}`}>
        <label
          className={`label ${isFocused && "label-focus"}`}
          htmlFor={fieldName}
        >
          {placeholder || fieldName}
        </label>
        <input
          type={fieldType ? fieldType : "text"}
          className={`field ${error && "field-error"}`}
          name={name}
          id={fieldName}
          onFocus={handleFocus}
          onBlur={handleBlur}
          ref={inputRef}
          onChange={onChange}
          required={required}
        />
        {icon && (
          <div
            onClick={togglePassword}
            className='field-icon-wrapper'
            id={fieldName}
          >
            <img src={icon} alt='input icon' />
          </div>
        )}{" "}
      </div>
    </>
  );
};
