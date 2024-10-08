import React, { useState } from "react";

import { Logo } from "../Logo";
import "./style.scss";

export const Header = ({
  isNavVisible,
  setIsNavVisible,
  toggleNav,
  isTabletMode,
}) => {
  const handleBurgerClick = () => {
    setIsNavVisible(!isNavVisible);
    toggleNav();
  };

  if (!isTabletMode) {
    return null;
  }

  return (
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
  );
};
