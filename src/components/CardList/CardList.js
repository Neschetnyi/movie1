import React, { Component } from "react";
import Card from "./Сard/Сard";
import "./CardList.css";
import GetData from "../../servises/GetData";

class CardList extends Component {
  movies = new GetData();

  state = {
    cards: null,
  };

  takeMovies() {
    this.movies.then((value) => {
      this.setState({ cards: value });
    });
  }

  render() {
    let cardArr = [<Card />, <Card />, <Card />, <Card />, <Card />, <Card />];
    console.log(this.state.cards);
    return <div className="CardList">{cardArr}</div>;
  }
}

export default CardList;
