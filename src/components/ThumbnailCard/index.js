import React from "react";
import "./style.scss";

import { CustomButton } from "../CustomButton";

export const ThumbnailCard = ({ image, title, size }) => {
  return (
    <div className={`thumbnail-card-container thumbnail-card-${size}`}>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${image})`,
        }}
        className="card-image"
      />
      <CustomButton className="card-button" title="Read More" />
      <h2 className="card-title">{title}</h2>
    </div>
  );
};
