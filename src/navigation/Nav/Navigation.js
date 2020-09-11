import React, { useState } from "react";

import "./Navigation.css";
import { CustomSvg } from "../../components";
import * as userPic from "../../assets/sienna.jpg";
import { Link } from "react-router-dom";

export const Navigation = () => {
  const navItems = [
    {
      id: "home",
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

  const [selected, setSelected] = useState("home");

  const navItemClickHandler = (id) => {
    setSelected(id);
  };

  return (
    <div className={"navigation-container"}>
      <div className="logo-holder">
        <CustomSvg name={"fingerPrint"} width={"50"} height={"50"} />
        <p className={"logo-text"}>Travel Overload</p>
      </div>
      <div className={"main"}>
        {navItems.map((item) => (
          <div className={"nav-item-holder"} key={item.id}>
            <Link
              to={item.id}
              className={
                selected == item.id
                  ? "nav-item nav-item-selected"
                  : item.id == "register"
                  ? "nav-item nav-register"
                  : "nav-item"
              }
              onClick={() => navItemClickHandler(item.id)}
            >
              <CustomSvg
                name={item.icon}
                width={"24"}
                height={"24"}
                color={
                  selected == item.id
                    ? "#18A0FB"
                    : item.id == "register"
                    ? "#ffffff"
                    : "#000000"
                }
              />
              <p
                className={
                  selected == item.id
                    ? "nav-item-text nav-item-text-selected"
                    : item.id == "register"
                    ? "nav-item-text nav-register-text"
                    : "nav-item-text"
                }
              >
                {item.name}
              </p>
            </Link>
            {selected == item.id ? (
              <div className={"nav-item-selected-connector"} />
            ) : null}
          </div>
        ))}
      </div>
      <div className={"user-holder"}>
        <div
          onClick={() => setSelected("user")}
          className={selected == "user" ? "user-item-selected" : "user-item"}
        >
          <div className={"image-holder"}>
            <img src={userPic} className={"user-image"} />
          </div>
          <p className={"user-name"}>Sienna Miller</p>
        </div>
        {selected == "user" ? (
          <div className={"nav-item-selected-connector"} />
        ) : null}
      </div>
    </div>
  );
};
