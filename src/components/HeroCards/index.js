import React from "react";
import "./style.scss";

import { ThumbnailCard } from "../ThumbnailCard";

export const HeroCards = ({ cardsData, largeCards = [] }) => {
  return (
    <div className="hero-cards-container">
      {cardsData.map((card, ind) => (
        <ThumbnailCard
          image={card.image}
          title={card.title}
          size={largeCards.includes(ind) && "large"}
        />
      ))}
    </div>
  );
};
