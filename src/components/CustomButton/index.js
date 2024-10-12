import React from "react";
import { Loader } from "../Loader";
import "./style.scss";

export const CustomButton = ({
  title,
  className,
  onClick,
  icon,
  type = "button",
  style = {},
  loading = false,
  disabled = false,
}) => {
  return (
    <button
      className={`button ${className}`}
      onClick={onClick}
      type={type}
      style={{ ...style }}
      disabled={loading || disabled}
    >
      {loading ? <span className='button-loader' /> : (icon, title)}
    </button>
  );
};
