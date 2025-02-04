import React, { Component } from "react";
import Card from "./Сard/Сard";
import "./CardList.css";
import GetData from "../../servises/GetData";
import { Spin } from "antd";
import { Alert } from "antd";

class CardList extends Component {
  movies = new GetData();

  state = {
    cards: null,
    onError: false,
    errorMassage: "",
    errorName: "",
    loaded: false,
    onlineStatus: false,
  };

  takeMovies() {
    this.movies.getAllMovies();
  }
  changeState() {
    this.movies
      .getAllMovies()
      .then((value) => {
        if (typeof value === "object") {
          this.setState({ cards: value.results });
        }
      })
      .then(() => {
        this.setState({ loaded: true });
        console.log("loaded is true");
      })
      .catch((err) => {
        console.log("error is: ", err.message);
        this.setState({ onError: true });
        this.setState({ errorMassage: err.message });
        this.setState({ errorName: err.name });
      });
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
    setTimeout(() => {
      this.takeMovies();
      this.changeState();
      this.setState({ didMount: true });
    }, 1000);

    window.addEventListener("online", this.handleOnline);
    window.addEventListener("offline", this.handleOffline);
  }

  render() {
    console.log("state is: ", this.state.cards);
    let cardArr = [];
    if (this.state.cards !== null) {
      for (let i = 0; i < 6; i++) {
        cardArr.push(
          <Card key={this.state.cards[i].id} card={this.state.cards[i]} />
        );
      }
    }

    return this.state.onError ? (
      <div className="CardList">
        <Alert
          message={this.state.errorName}
          description={this.state.errorMassage}
          type="error"
          showIcon
        />
      </div>
    ) : this.state.onlineStatus ? (
      <div className="CardList">
        <Alert
          message="You are offline"
          description="Please check your internet connection"
          type="error"
          showIcon
        />
      </div>
    ) : this.state.loaded ? (
      <div className="CardList">{cardArr}</div>
    ) : (
      <div className="CardList">
        <Spin size="large" />
      </div>
    );
  }
}

export default CardList;
