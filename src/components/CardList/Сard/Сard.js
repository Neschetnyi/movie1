import React, { Component } from "react";
import "./Card.css";
import { Tag } from "antd";
import cardBG from "./cardBG.png";
import RateMovie from "./RateMovie/RateMovie";
import AverageRaiting from "./AverageRaiting/AverageRaiting";
import MyContext from "../../MyContext/MyContext";

class Card extends Component {
  render() {
    const { card, genres } = this.props;
    console.log(
      `single card ${card.title} card.title.lenght: ${card.title.length} card genres: ${genres}`,
      card,
      genres
    );
    let tagArr = genres.map((genre) => {
      return <Tag>{genre}</Tag>;
    });

    let heightTitleRegulation = () => {
      if (card.title.length > 35) {
        return "80px";
      } else {
        return null;
      }
    };

    let date = new Date(card.release_date);

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
            <div className="ContentHeader">
              <div className="ContentHeaderH2">
                <h2 className="Content_h2">{card.title}</h2>
              </div>
              <div>
                <AverageRaiting {...card} />
              </div>
            </div>

            <div className="Date">{date.toLocaleDateString()}</div>
            <div className="Tags">{tagArr}</div>

            <div className="Text" style={{ height: heightTitleRegulation() }}>
              {card.overview}
            </div>
          </div>
          <div className="Rating">
            <RateMovie
              id={card.id}
              guestSessionId={this.context.guestSessionId}
            />
          </div>
        </div>
      </div>
    );
  }
}

Card.contextType = MyContext;

export default Card;
