import React from "react";
import { Link } from "react-router-dom";

import { CustomSvg } from "../CustomSvg";
import "./style.scss";

export const Logo = () => {
  return (
    <Link className="logo-wrapper" to="/">
      <CustomSvg name="fingerPrint" width="50" height="50" />
      <div className="logo-text">
        <p className="logo-text-first">Travel</p>
        <p className="logo-text-second"> Overload</p>
      </div>
    </Link>
  );
};
