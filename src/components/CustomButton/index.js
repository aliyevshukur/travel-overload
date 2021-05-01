import React from "react";
import "./style.scss";

export const CustomButton = ({ title, className, onClick, icon }) => {
  return (
    <button className={`button-container ${className}`} onClick={onClick}>
      {icon}
      {title}
    </button>
  );
};
