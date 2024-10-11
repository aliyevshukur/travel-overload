import React from "react";

import "./style.scss";

export const FormMessage = ({ text, type = "error" }) => {
  return (
    <div className={`message ${type === "success" ? "success" : "error"}`}>
      <p className='message-text'>{text}</p>
    </div>
  );
};
