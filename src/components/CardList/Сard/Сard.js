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
  dateRef = React.createRef();
  rateRef = React.createRef();
  averageRaitingRef = React.createRef();

  state = {
    headerHeight: 0,
    textHeight: 0,
    contentHeight: 0,
    tagsHeight: 0,
    dateHeight: 0,
    rateHeight: 0,
    averageRaitingHeight: 0,
    newTextHeight: 0,
    newHeaderHeight: 0,
  };

  componentDidMount() {
    let contentHeight = this.contentRef.current
      ? this.contentRef.current.offsetHeight
      : 0;
    let headerHeight = this.headerRef.current
      ? this.headerRef.current.offsetHeight
      : 0;
    let textHeight = this.textRef.current
      ? this.textRef.current.offsetHeight
      : 0;
    let tagsHeight = this.tagsRef.current
      ? this.tagsRef.current.offsetHeight
      : 0;
    let dateHeight = this.dateRef.current
      ? this.dateRef.current.offsetHeight
      : 0;
    let rateHeight = this.rateRef.current
      ? this.rateRef.current.offsetHeight
      : 0;
    let averageRaitingHeight = this.averageRaitingRef.current
      ? this.averageRaitingRef.current.offsetHeight
      : 0;
    let newHeaderHeight = headerHeight;
    if (headerHeight > 75) {
      newHeaderHeight = 75;
    }
    let newTextHeight =
      contentHeight - headerHeight - tagsHeight - dateHeight - rateHeight - 22;

    this.setState(
      {
        contentHeight,
        headerHeight,
        textHeight,
        tagsHeight,
        dateHeight,
        rateHeight,
        averageRaitingHeight,
        newTextHeight,
        newHeaderHeight,
      },
      () => {
        console.log(
          `element ${this.props.card.title} content height: ${contentHeight}`
        );
        console.log(
          `element ${this.props.card.title} header height: ${headerHeight}`
        );
        console.log(
          `element ${this.props.card.title} text height: ${textHeight}`
        );
        console.log(
          `element ${this.props.card.title} tags height: ${tagsHeight}`
        );
        console.log(
          `element ${this.props.card.title} date height: ${dateHeight}`
        );
        console.log(
          `element ${this.props.card.title} rate height: ${rateHeight}`
        );
        console.log(
          `element ${this.props.card.title} averageRaiting height: ${averageRaitingHeight}`
        );
        console.log(
          `element ${this.props.card.title} newTextHeight height: ${newTextHeight}`
        );
        console.log(
          `element ${this.props.card.title} newHeaderHeight height: ${newHeaderHeight}`
        );
      }
    );
  }

  render() {
    const { card, genres } = this.props;

    let tagArr = genres.map((genre) => {
      return <Tag>{genre}</Tag>;
    });

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
              <div
                className="ContentHeaderH2"
                style={{ height: this.state.newHeaderHeight }}
              >
                <h2 ref={this.headerRef} className="Content_h2">
                  {card.title}
                </h2>
              </div>
              <div ref={this.averageRaitingRef}>
                <AverageRaiting {...card} />
              </div>
            </div>

            <div ref={this.dateRef} className="Date">
              {date.toLocaleDateString()}
            </div>
            <div ref={this.tagsRef} className="Tags">
              {tagArr}
            </div>

            <div
              ref={this.textRef}
              className="Text"
              style={{ height: this.state.newTextHeight }}
            >
              {card.overview}
            </div>
          </div>
          <div className="Rating" ref={this.rateRef}>
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
