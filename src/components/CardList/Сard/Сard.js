import React from "react";
import cardBG from "./cardBG.png";
import "./Card.css";
import { Tag } from "antd";

function Card() {
  let date = new Date();
  return (
    <div className="Card">
      <div className="Image">
        <img alt="no alt" src={cardBG} />
      </div>
      <div className="Content">
        <h2 className="Content_h2">This Page</h2>

        <p className="Date">{date.toLocaleDateString()}</p>
        <div className="Tags">
          <Tag>Action</Tag>
          <Tag>Drama</Tag>
        </div>
        <p className="Text">
          A former basketball all-star, who has lost his wife and family
          foundation in a struggle with addiction attempts to regain his soul
          and salvation by becoming the coach of a disparate ethnically mixed
          high ...
        </p>
      </div>
    </div>
  );
}

export default Card;
