import React from "react";
import { connect } from "react-redux";
import { CardAuthor } from "./CardAuthor";
import "./style.scss";
import { isTabletMode } from "../../store/appState";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const mapStateToProps = (store) => ({
  isTabletMode: isTabletMode(store),
});

export const BlogCard = connect(mapStateToProps)(
  ({ cardInfo, className = "", isTabletMode, mini = false }) => {
    const { thumbnailImage, title, postDate, author, authorImage } = cardInfo;
    const { context: contextRaw } = cardInfo;
    let context = contextRaw[2].text;

    const history = useHistory();
    let maxLength = 110;

    if (isTabletMode) maxLength = 130;
    if (context.length > maxLength) {
      context = context.substr(0, maxLength) + "...";
    }

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
        className={"blog-card " + (mini ? "blog-card-mini " : "") + className}
        onClick={() => {
          history.push(`/blogs/${cardInfo._id}`);
        }}
        style={style}
      >
        <img
          src={thumbnailImage}
          alt='card'
          className={"blog-card-image " + (mini && "blog-card-image-mini")}
        />
        <div
          className={"blog-card-content " + (mini && "blog-card-content-mini")}
        >
          <h2 className={"blog-card-title " + (mini && "blog-card-title-mini")}>
            {title}
          </h2>
          {!mini && <p className='blog-card-context'>{context}</p>}
          <CardAuthor
            authorInfo={{
              postDate,
              author: author,
              authorImage: authorImage,
            }}
          />{" "}
        </div>
      </div>
    );
  },
);
