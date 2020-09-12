import React from "react";
import "./style.scss";

export const PageTitle = ({ title, className }) => {
  return (
    <div className={`page-title ${className}`}>
      <div className="line"></div>
      <h3 className="title">{title}</h3>
    </div>
  );
};
