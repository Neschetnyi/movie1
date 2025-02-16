import React, { Component } from "react";
import "./Card.css";
import { Tag } from "antd";
import cardBG from "./cardBG.png";
import RateMovie from "./RateMovie/RateMovie";
import AverageRaiting from "./AverageRaiting/AverageRaiting";
import MyContext from "../../MyContext/MyContext";

class Card extends Component {
  contentRef = React.createRef();
  headerRef = React.createRef();
  textRef = React.createRef();
  tagsRef = React.createRef();

  state = {
    headerHeight: 0,
    textHeight: 0,
    contentHeight: 0,
    tagsHeight: 0,
  };

  componentDidMount() {
    // Получаем высоту отрендеренного элемента после монтирования
    if (this.contentRef.current) {
      this.setState(
        {
          contentHeight: this.contentRef.current.offsetHeight,
        },
        () => {
          console.log(
            `element ${this.props.card.title} header height:${this.state.headerHeight} text height:${this.state.textHeight} tags height:${this.state.tagsHeight} content height:${this.state.contentHeight}`
          );
        }
      );
    }
  }

  render() {
    const { card, genres } = this.props;

    let tagArr = genres.map((genre) => {
      return <Tag>{genre}</Tag>;
    });

    let heightTitleRegulation = () => {
      if (card.title.length > 35 && tagArr.length < 3) {
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
        <div ref={this.contentRef} className="Content">
          <div>
            <div className="ContentHeader">
              <div className="ContentHeaderH2">
                <h2 ref={this.headerHeight} className="Content_h2">
                  {card.title}
                </h2>
              </div>
              <div>
                <AverageRaiting {...card} />
              </div>
            </div>

            <div className="Date">{date.toLocaleDateString()}</div>
            <div className="Tags">{tagArr}</div>

            <div
              ref={this.textRef}
              className="Text"
              style={{ height: heightTitleRegulation() }}
            >
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
