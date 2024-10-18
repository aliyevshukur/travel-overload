import React, { useState } from "react";

import { Logo } from "../Logo";
import "./style.scss";

export const Header = ({ isNavVisible, setIsNavVisible }) => {
  const handleBurgerClick = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <div className='header-wrapper'>
      <header className='header'>
        <Logo />
        <button
          className={`burger-button ${isNavVisible ? "active" : ""}`}
          onClick={handleBurgerClick}
        >
          <div />
          <div />
          <div />
        </button>
      </header>
    </div>
  );
};
