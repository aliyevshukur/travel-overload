import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BlogCard, PageTitle } from "../../components";
import { Loader } from "../../components/Loader";
import { getBreakpoints, getWindowWidth } from "../../store/appState";
import { fetchBlogs, getBlogs, isLoading } from "../../store/blogs";
import "./style.scss";
import UserPanel from "./UserPanel";

const mapStateToProps = (store) => {
  return {
    breakpoints: getBreakpoints(store),
    windowWidth: getWindowWidth(store),
    blogs: getBlogs(store),
    isLoading: isLoading(store),
  };
};

export const UserPage = connect(mapStateToProps)(
  ({ breakpoints, windowWidth, blogs, isLoading, dispatch }) => {
    const userData = {
      profilePicture:
        "https://images.unsplash.com/flagged/photo-1595514191830-3e96a518989b?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dile",
      fullName: "Henry Roberts",
      email: "henryroberts@mail.com",
    };

    const [maxLength, setMaxLength] = useState(windowWidth);

    useEffect(() => {
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

      calculateMaxLength();
    }, [windowWidth, breakpoints.desktopSmall, breakpoints.desktop]);

    useEffect(() => {
      dispatch(fetchBlogs());
    }, [dispatch]);

    if (isLoading) {
      return (
        <div className='user-page-wrapper'>
          <div className='user-page'>
            <div className='user-page-blog-list'>
              <Loader />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='user-page-wrapper'>
        <div className='user-page'>
          <div className='user-page-header'>
            <PageTitle title='Your posts' />
            <div className='picture-wrapper'>
              <img
                src={userData.profilePicture}
                alt=''
                className='user-picture'
              />
            </div>
          </div>
          <div className='user-page-blog-list'>
            {blogs.map((item, ind) => {
              return (
                <BlogCard
                  key={ind}
                  cardInfo={item}
                  className='user-page-blog-list-item'
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
  },
);
