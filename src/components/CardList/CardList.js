import React, { Component } from "react";
import Card from "./Сard/Сard";
import "./CardList.css";
import GetData from "../../servises/GetData";
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
    console.log("CardList did mount ", this.context);

    this.context.changeCards();
    this.setState({ didMount: true });

    window.addEventListener("online", this.handleOnline);
    window.addEventListener("offline", this.handleOffline);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("CardList did update ", this.context);

    if (
      prevState.prevUrl !== this.context.urlPart ||
      prevState.prevPage !== this.context.pageNumber
    ) {
      this.context.changeCards();
      this.setState({ prevUrl: this.context.urlPart });
      this.setState({ prevPage: this.context.pageNumber });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.handleOnline);
    window.removeEventListener("offline", this.handleOffline);
  }

  render() {
    let cardArr = [];
    if (this.context.cards !== null) {
      if (this.context.cards.length !== 0) {
        for (let i = 0; i < this.context.cards.length; i++) {
          if (this.context.cards[i] !== undefined) {
            cardArr.push(
              <Card
                key={this.context.cards[i].id}
                card={this.context.cards[i]}
              />
            );
          }
        }
      }
    }

    if (this.state.onError) {
      console.log("contentRender error", this.state.cards);
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
      console.log("contentRender onlineStatus", this.context.cards);
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
      Array.isArray(this.context.cards) &&
      this.context.cards.length === 0 &&
      this.context.urlPart !== ""
    ) {
      console.log("contentRender arr = 0", this.context.cards);
      return (
        <div className="Alert">
          <Alert
            message="No results found"
            description="Please try again"
            type="info"
          />
        </div>
      );
    } else if (this.context.notLoaded) {
      console.log("contentRender notloaded", this.context.cards);
      return (
        <div className="Alert">
          <Spin size="large" />
        </div>
      );
    } else if (this.context.cards !== null && this.context.urlPart !== "") {
      console.log("contentRender cards", this.context.cards);
      return <div className="CardList">{cardArr}</div>;
    } else {
      console.log("contentRender default", this.context.cards);
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

CardList.contextType = MyContext;

export default CardList;
