import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "./Navigation.scss";
import { CustomSvg } from "../../components";
import profile from "../../assets/profile.jpg";
import { Link } from "react-router-dom";
import { Logo } from "../../components/Logo";

export const Navigation = ({
  isTabletMode,
  setIsTabletMode,
  isNavVisible,
  setIsNavVisible,
}) => {
  const [selected, setSelected] = useState();
  const { pathname } = useLocation();

  const navItems = [
    {
      id: "new",
      name: "New",
      icon: "timer",
    },
    {
      id: "popular",
      name: "Popular",
      icon: "star",
    },
    {
      id: "create",
      name: "Create",
      icon: "plus",
    },
    {
      id: "login",
      name: "Log In",
      icon: "signIn",
    },

    {
      id: "register",
      name: "Register",
      icon: "register",
    },
  ];

  useEffect(() => {
    setSelected(pathname.substr(1, pathname.length));
  }, [pathname]);

  const navItemClickHandler = (id) => {
    setIsNavVisible(false);
  };

  const pickNavItemClass = (id) => {
    if (selected === id) {
      return "nav-item nav-item-selected";
    } else if (id === "register") {
      return "nav-item nav-item-register";
    } else {
      return "nav-item";
    }
  };

  const pickSVGColor = (id) => {
    if (selected === id) {
      return "#18A0FB";
    } else if (id === "register") {
      return "#ffffff";
    } else {
      return "#000000";
    }
  };

  return (
    <div
      className="navigation-container"
      style={isNavVisible ? { display: "flex" } : {}}
    >
      {!isTabletMode && <Logo />}
      <div className="nav-items">
        {navItems.map((item) => (
          <div className="nav-item-wrapper" key={item.id}>
            <Link
              to={item.id}
              className={pickNavItemClass(item.id)}
              style={isTabletMode ? { borderRadius: "28px" } : {}}
              onClick={() => navItemClickHandler(item.id)}
            >
              <CustomSvg
                name={item.icon}
                width={"24"}
                height={"24"}
                color={pickSVGColor(item.id)}
                className="nav-item-icon"
              />
              {item.name}
            </Link>

            {selected === item.id && (
              <div
                className={!isTabletMode ? "nav-item-selected-connector" : ""}
              />
            )}
          </div>
        ))}
      </div>
      <div className={"user-item-wrapper"}>
        <Link
          to="user"
          onClick={() => setSelected("user")}
          className={`user-item ${selected === "user" && "user-item-selected"}`}
        >
          <div className={"image-wrapper"}>
            <img src={profile} className={"user-image"} alt="user" />
          </div>
          <p className={"user-name"}>Sienna Miller</p>
        </Link>

        {selected === "user" && (
          <div className={!isTabletMode ? "nav-item-selected-connector" : ""} />
        )}
      </div>
    </div>
  );
};
