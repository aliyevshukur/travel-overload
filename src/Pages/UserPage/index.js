import React from "react";

import "./style.scss";
import { BlogCard, PageTitle } from "../../components";
import { blogs } from "../../data";
import { UserPanel } from "./UserPanel";

export const UserPage = () => {
  const userData = {
    profilePicture:
      "https://static01.nyt.com/images/2016/09/28/us/17xp-pepethefrog_web1/28xp-pepefrog-articleLarge.jpg?quality=90&auto=webp",
    fullName: "Pepe The Frog",
    email: "based@department.org",
  };

  return (
    <div className="user-page-wrapper">
      <div className="user-page">
        <PageTitle title="Sizin paylaşımlarınız" className="user-page-title" />
        <div className="user-page-blog-list">
          {blogs.map((item, ind) => {
            return (
              <BlogCard
                key={ind}
                cardInfo={item}
                className="user-page-blog-list-item"
                maxLength={220}
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
};
