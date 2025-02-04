import React, { Component } from "react";
import Card from "./Сard/Сard";
import "./CardList.css";
import GetData from "../../servises/GetData";
import { Spin } from "antd";

class CardList extends Component {
  movies = new GetData();

  state = {
    cards: null,
    onError: false,
    errorMassage: "",
    loaded: false,
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
      });
  }

  componentDidMount() {
    this.takeMovies();
    this.changeState();
    this.setState({ didMount: true });
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
        <h1>{this.state.errorMassage}</h1>
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
