import React from "react";
import "./Card.css";
import { Tag } from "antd";
import cardBG from "./cardBG.png";
import RateMovie from "./RateMovie/RateMovie";
import { Avatar } from "antd";

function Card({ card }) {
  console.log("single card", card);
  let date = new Date();

  let cardPoster = `https://image.tmdb.org/t/p/w500${card.backdrop_path}`;
  if (card.backdrop_path === null) {
    cardPoster = cardBG;
  }

  return (
    <div className="Card">
      <div className="Image">
        <img className="ImageSising" alt="no alt" src={cardPoster} />
      </div>
      <div className="Content">
        <div>
          <div>
            <h2 className="Content_h2">{card.title}</h2>
          </div>
          <div>
            <Avatar
              size={42}
              style={{
                color: "#f56a00",
                backgroundColor: "transparent",
                boxShadow: "inset 0 0 0 1px #f56a00",
              }}
            >
              {card.vote_average}
            </Avatar>
          </div>
        </div>

        <p className="Date">{date.toLocaleDateString()}</p>
        <div className="Tags">
          <Tag>Action</Tag>
          <Tag>Drama</Tag>
        </div>
        <p className="Text">{card.overview}</p>
        <div className="Rating">
          <RateMovie />
        </div>
      </div>
    </div>
  );
}

export default Card;
