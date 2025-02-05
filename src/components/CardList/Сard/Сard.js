import React from "react";
import cardBG from "./cardBG.png";
import "./Card.css";
import { Tag } from "antd";

function Card({ card }) {
  let date = new Date();
  console.log(card);
  let cardPoster = `https://image.tmdb.org/t/p/w500${card.backdrop_path}`;
  return (
    <div className="Card">
      <div className="Image">
        <img className="ImageSising" alt="no alt" src={cardPoster} />
      </div>
      <div className="Content">
        <h2 className="Content_h2">{card.title}</h2>

        <p className="Date">{date.toLocaleDateString()}</p>
        <div className="Tags">
          <Tag>Action</Tag>
          <Tag>Drama</Tag>
        </div>
        <p className="Text">{card.overview}</p>
      </div>
    </div>
  );
}

export default Card;
