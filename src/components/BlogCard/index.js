import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Eye from "../../assets/eye.svg";
import { isTabletMode } from "../../store/appState";
import { CardAuthor } from "./CardAuthor";
import "./style.scss";

const mapStateToProps = (store) => ({
  isTabletMode: isTabletMode(store),
});

export const BlogCard = connect(mapStateToProps)(
  ({ cardInfo: blog, className = "", mini = false }) => {
    const { thumbnailImage, title = "", postDate = "", author = {} } = blog;
    const { context } = blog;
    let description = context[2]?.text || "No description";

    const history = useHistory();

    let style = {};
    if (mini) {
      style = {
        backgroundImage: `url(${thumbnailImage})`,
        backgroundSize: "cover", // Adjusts the size of the image
        backgroundPosition: "center", // Centers the image
      };
    }

    return (
      <div
        className={"blogcard " + (mini ? "blogcard-mini " : "") + className}
        onClick={() => {
          history.push(`/blogs/${blog._id}`);
        }}
        style={style}
      >
        <img
          src={thumbnailImage}
          alt='card'
          className={"blogcard-image " + (mini && "blogcard-image-mini")}
        />
        <div
          className={"blogcard-content " + (mini && "blogcard-content-mini")}
        >
          <h2
            className={
              "blogcard-content-title " +
              (mini && "blogcard-content-title-mini")
            }
          >
            {title}
          </h2>

          {!mini && (
            <p className='blogcard-content-description'>{description}</p>
          )}
          <div className='blogcard-content-bottom'>
            <CardAuthor
              authorInfo={{
                postDate,
                author: author?.name + " " + author?.surname,
                authorImage: author?.profilePicture,
              }}
            />
            {!mini && (
              <div className='blogcard-content-bottom-views'>
                <img
                  src={Eye}
                  alt='eye'
                  className='blogcard-content-bottom-views-icon'
                />
                <p>{blog.views}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  },
);
