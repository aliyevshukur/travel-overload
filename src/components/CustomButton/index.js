import React from "react";
import "./style.scss";

export const CustomButton = ({
  title,
  className,
  onClick,
  icon,
  type = "button",
}) => {
  return (
    <button
      className={`button-container ${className}`}
      onClick={onClick}
      type={type}
    >
      {icon}
      {title}
    </button>
  );
};
