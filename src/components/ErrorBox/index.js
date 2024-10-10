import React, { useRef, useState } from "react";

import "./style.scss";

export const ErrorBox = ({ text, type = "error" }) => {
  return (
    <div
      className={"error-box"}
      style={{ backgroundColor: type === "success" ? "green" : "red" }}
    >
      <p className='error-box-text'>{text}</p>
    </div>
  );
};
