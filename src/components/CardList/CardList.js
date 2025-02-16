import React, { Component } from "react";
import Card from "./Сard/Сard";
import "./CardList.css";
import { Spin } from "antd";
import { Alert } from "antd";
import MyContext from "../MyContext/MyContext";

class CardList extends Component {
  state = {
    onError: false,
    errorMassage: "",
    errorName: "",
    onlineStatus: false,
    error: null,
    prevUrl: "",
    prevPage: null,
  };

  changeStateArrLengthTrue() {
    this.setState({ arrLength: true });
  }

  changeStateArrLengthFalse() {
    this.setState({ arrLength: false });
  }

  handleOnline = () => {
    console.log("online");
    this.setState({ onlineStatus: false });
  };

  handleOffline = () => {
    console.log("offline");
    this.setState({ onlineStatus: true });
  };

  componentDidMount() {
    console.log("CardList did mount ");

    //this.context.changeCards();
    this.setState({ didMount: true });

    window.addEventListener("online", this.handleOnline);
    window.addEventListener("offline", this.handleOffline);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("CardList did update ");
    /*
    if (
      prevState.prevUrl !== this.context.urlPart ||
      prevState.prevPage !== this.context.pageNumber
    ) {
      console.log("CardList did update this.context.cards", this.context.cards);

      // this.context.changeCards();

      this.setState({ prevUrl: this.context.urlPart });
      this.setState({ prevPage: this.context.pageNumber });
    }
      */
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.handleOnline);
    window.removeEventListener("offline", this.handleOffline);
  }

  render() {
    let cardsToRender = this.props.cards;

    let cardArr = [];
    if (cardsToRender !== null && cardsToRender !== undefined) {
      if (cardsToRender.length !== 0) {
        for (let i = 0; i < cardsToRender.length; i++) {
          if (cardsToRender[i] !== undefined) {
            let genresArr = this.props.genres.map((el, index, array) => {
              let newEl = null;
              if (cardsToRender[i].genre_ids.includes(el.id)) {
                newEl = el.name;
              }
              return newEl;
            });
            genresArr = genresArr.filter((el) => el !== null);
            cardArr.push(
              <Card
                key={cardsToRender[i].id}
                card={cardsToRender[i]}
                genres={genresArr}
                ratedMoviesArray={this.props.ratedMoviesArray}
                cards={this.props.cards}
                raitingLoaded={this.props.raitingLoaded}
                urlPart={this.props.urlPart}
                pageNumber={this.props.pageNumber}
                totalPages={this.props.totalPages}
                guestSessionId={this.props.guestSessionId}
                notLoaded={this.props.notLoaded}
                addRaitinginProcess={this.props.addRaitinginProcess}
                changeRatedMoviesArray={this.props.changeRatedMoviesArray}
                changeAddRaitinginProcessTrue={
                  this.props.changeAddRaitinginProcessTrue
                }
                changeAddRaitinginProcessFalse={
                  this.props.changeAddRaitinginProcessFalse
                }
                changeRaitingLoadedTrue={this.props.changeRaitingLoadedTrue}
                changeRaitingLoadedFalse={this.props.changeRaitingLoadedFalse}
                changeCards={this.props.changeCards}
                Pages={this.props.Pages}
                changeUrlPart={this.props.changeUrlPart}
                changePageNumber={this.props.changePageNumber}
              />
            );
          }
        }
      }
    }

    if (this.state.onError) {
      console.log("contentRender error", cardsToRender);
      return (
        <div className="Alert">
          <Alert
            message={this.state.errorName}
            description={this.state.errorMassage}
            type="error"
          />
        </div>
      );
    } else if (this.state.onlineStatus) {
      console.log("contentRender onlineStatus", cardsToRender);
      return (
        <div className="Alert">
          <Alert
            message="You are offline"
            description="Please check your internet connection"
            type="error"
          />
        </div>
      );
    } else if (
      Array.isArray(cardsToRender) &&
      cardsToRender.length === 0 &&
      this.props.urlPart !== ""
    ) {
      console.log("contentRender arr = 0", cardsToRender);
      return (
        <div className="Alert">
          <Alert
            message="No results found"
            description="Please try again"
            type="info"
          />
        </div>
      );
    } else if (this.props.notLoaded) {
      console.log("contentRender notloaded", cardsToRender);
      return (
        <div className="Alert">
          <Spin size="large" />
        </div>
      );
    } else if (cardsToRender !== null && this.props.urlPart !== "") {
      console.log("contentRender cards", cardsToRender);
      return <div className="CardList">{cardArr}</div>;
    } else {
      console.log("contentRender default", cardsToRender);
      return (
        <div className="Alert">
          <Alert
            message="No text in search form"
            description="Please type something"
            type="info"
          />
        </div>
      );
    }
  }
}

// CardList.contextType = MyContext;

export default CardList;
