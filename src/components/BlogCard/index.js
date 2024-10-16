import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { isTabletMode } from "../../store/appState";
import { CardAuthor } from "./CardAuthor";
import "./style.scss";

const mapStateToProps = (store) => ({
  isTabletMode: isTabletMode(store),
});

export const BlogCard = connect(mapStateToProps)(
  ({ cardInfo, className = "", mini = false }) => {
    const { thumbnailImage, title, postDate, author } = cardInfo;
    const { context: contextRaw } = cardInfo;
    let context = contextRaw[2].text;

    const history = useHistory();

    let style = {};
    if (mini) {
      style = {
        backgroundImage: `url(${thumbnailImage})`,
        backgroundSize: "cover", // Adjusts the size of the image
        backgroundPosition: "center", // Centers the image
      };
    }

    function truncateText(context, length) {
      if (context.length > length) {
        return context.substring(0, length) + "...";
      }
      return context;
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
            {truncateText(title, 50)}
          </h2>
          {!mini && (
            <p className='blog-card-context'>{truncateText(context, 150)}</p>
          )}
          <CardAuthor
            authorInfo={{
              postDate,
              author: author?.name + " " + author?.surname,
              authorImage: author?.profilePicture,
            }}
          />{" "}
        </div>
      </div>
    );
  },
);
