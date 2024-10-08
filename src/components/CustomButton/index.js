import React from "react";
import "./style.scss";

export const CustomButton = ({
  title,
  className,
  onClick,
  icon,
  type = "button",
  style = {},
}) => {
  return (
    <button
      className={`button-container ${className}`}
      onClick={onClick}
      type={type}
      style={{ ...style }}
    >
      {icon}
      {title}
    </button>
  );
};
