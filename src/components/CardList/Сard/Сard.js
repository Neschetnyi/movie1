import React from "react";
import cardBG from "./cardBG.png";
import "./Card.css";
import { Tag } from "antd";

function Card({ card }) {
  let date = new Date();
  console.log(card);
  return (
    <div className="Card">
      <div className="Image">
        <img alt="no alt" src={cardBG} />
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
