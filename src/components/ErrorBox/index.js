import React from "react";

import "./style.scss";

export const ErrorBox = ({ text }) => {
  return (
    <div className="error-box">
      <p className="error-box-text">{text}</p>
    </div>
  );
};
