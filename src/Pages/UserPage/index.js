import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import "./style.scss";
import { BlogCard, PageTitle } from "../../components";
import { blogs } from "../../data";
import { UserPanel } from "./UserPanel";
import { getBreakpoints, getWindowWidth } from "../../store/appState";
import profile from "../../assets/profile.jpg";

const mapStateToProps = (store) => {
  return {
    breakpoints: getBreakpoints(store),
    windowWidth: getWindowWidth(store),
  };
};

export const UserPage = connect(mapStateToProps)(
  ({ breakpoints, windowWidth }) => {
    const userData = {
      profilePicture: profile,
      fullName: "Sienna Miller",
      email: "sienna@mail.com",
    };

    const [maxLength, setMaxLength] = useState(windowWidth);

    useEffect(() => {
      calculateMaxLength();
    }, [windowWidth]);

    const calculateMaxLength = () => {
      if (windowWidth < breakpoints.desktopSmall) {
        setMaxLength(70);
        return;
      }
      if (windowWidth < breakpoints.desktop) {
        setMaxLength(100);
        return;
      } else setMaxLength(220);
    };

    return (
      <div className="user-page-wrapper">
        <div className="user-page">
          <div className="user-page-header">
            <PageTitle title="Sizin paylaşımlarınız" />
            <div className="picture-wrapper">
              <img
                src={userData.profilePicture}
                alt=""
                className="user-picture"
              />
            </div>
          </div>
          <div className="user-page-blog-list">
            {blogs.map((item, ind) => {
              return (
                <BlogCard
                  key={ind}
                  cardInfo={item}
                  className="user-page-blog-list-item"
                  maxLength={maxLength}
                />
              );
            })}
          </div>
        </div>
        <UserPanel
          profilePicture={userData.profilePicture}
          fullName={userData.fullName}
          email={userData.email}
        />
      </div>
    );
  }
);
