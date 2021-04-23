import React, { useState } from "react";

import "./Navigation.scss";
import { CustomSvg } from "../../components";
import * as userPic from "../../assets/sienna.jpg";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const [selected, setSelected] = useState("home");

  const navItems = [
    {
      id: "/",
      name: "Home",
      icon: "home",
    },
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

  const navItemClickHandler = (id) => {
    setSelected(id);
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
    <div className="navigation-container">
      <Link className="logo-wrapper" to="/">
        <CustomSvg name="fingerPrint" width="50" height="50" />
        <div className="logo-text">
          <p className="logo-text-first">Travel</p>
          <p className="logo-text-second"> Overload</p>
        </div>
      </Link>

      <div className="nav-items">
        {navItems.map((item) => (
          <div className="nav-item-wrapper" key={item.id}>
            <Link
              to={item.id}
              className={pickNavItemClass(item.id)}
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
              <div className={"nav-item-selected-connector"} />
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
            <img src={userPic} className={"user-image"} alt="user" />
          </div>
          <p className={"user-name"}>Sienna Miller</p>
        </Link>

        {selected === "user" && (
          <div className={"nav-item-selected-connector"} />
        )}
      </div>
    </div>
  );
};
