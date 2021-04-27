import React from "react";

import { Logo } from "../Logo";
import "./style.scss";

export const Header = ({ toggleNav }) => {
  return (
    <header className="header">
      <div className="button-space" />
      <Logo />
      <button className="burger-button" onClick={toggleNav}>
        <div />
        <div />
        <div />
      </button>
    </header>
  );
};
