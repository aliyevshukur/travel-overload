import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import connect from "react-redux/es/connect/connect";
import { Link } from "react-router-dom";
import GuestImage from "../assets/guest.png";
import { CustomSvg } from "../components";
import { Logo } from "../components/Logo";
import { getToken } from "../store/auth";
import { getUser } from "../store/user";
import "./style.scss";

const Navigation = ({ token, user, isNavVisible, setIsNavVisible }) => {
  const { pathname } = useLocation();
  const [navItems, setNavItems] = useState([]);

  useEffect(() => {
    if (token) {
      setNavItems([
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
      ]);
    } else {
      setNavItems([
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
      ]);
    }
  }, [token]); //eslint-disable-line react-hooks/exhaustive-deps

  // console.log("User in navigation", user);

  const navItemClickHandler = (id) => {
    setIsNavVisible(false);
  };
  const pickNavItemClass = (id) => {
    const selected = pathname.split("/")[1];

    let className = "nav-item";
    if (selected === id) {
      className = `${className} nav-item-selected`;
    }

    if (id === "register" && selected !== "register") {
      className = `${className} nav-item-register`;
    }

    return className;
  };

  const pickSVGColor = (id) => {
    const selected = pathname.split("/")[1];

    if (id === "register" && selected !== "register") {
      return "#ffffff";
    } else {
      return "#18A0FB";
    }
  };

  const getUserImage = () => {
    if (user) {
      return user.profilePicture || user.image;
    } else {
      return GuestImage;
    }
  };

  return (
    <div className={`navigation-wrapper ${isNavVisible ? "active" : ""}`}>
      {isNavVisible && (
        <div
          className='translucent-layer'
          onClick={() => setIsNavVisible(false)}
        />
      )}
      <div
        className={`navigation }`}
        style={isNavVisible ? { display: "flex" } : {}}
      >
        <Logo />

        {/* NAV ITEMS */}
        <div className='nav-items'>
          {navItems.map((item) => (
            <div className='nav-item-wrapper' key={item.id}>
              <Link
                to={`/${item.id}`}
                className={pickNavItemClass(item.id)}
                onClick={() => navItemClickHandler(item.id)}
              >
                <CustomSvg
                  name={item.icon}
                  width={"24"}
                  height={"24"}
                  color={pickSVGColor(item.id)}
                  className='nav-item-icon'
                />
                {item.name}
              </Link>

              {/* Add round border to selected Nav item */}
              {pathname.split("/")[1] === item.id && (
                <div className={"selected-border-radius"} />
              )}
            </div>
          ))}
        </div>

        {/* USER ITEM */}
        <div className={"user-item-wrapper"}>
          <Link
            to={token ? "/user" : "/login"}
            onClick={() => navItemClickHandler("user")}
            className={`user-item ${
              pathname.split("/")[1] === "user" && "user-item-selected"
            }`}
          >
            <div className={"image-wrapper"}>
              <img src={getUserImage()} className={"user-image"} alt='user' />
            </div>
            <p className={"user-name"}>
              {user ? user.name + " " + user.surname : "Guest"}
            </p>
          </Link>

          {pathname.split("/")[1] === "user" && (
            <div className={"selected-border-radius"} />
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  token: getToken(state),
  user: getUser(state),
});

export default connect(mapStateToProps)(Navigation);
