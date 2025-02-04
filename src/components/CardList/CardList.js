import React, { Component } from "react";
import Card from "./Сard/Сard";
import "./CardList.css";
import GetData from "../../servises/GetData";

class CardList extends Component {
  movies = new GetData();

  state = {
    cards: null,
  };

  constructor() {
    super();
    this.takeMovies();
    this.changeState();
  }

  takeMovies() {
    this.movies.getAllMovies();
  }
  changeState() {
    this.movies.getAllMovies().then((value) => {
      this.setState({ cards: value });
    });
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

    console.log(this.state.cards);
    return <div className="CardList">{cardArr}</div>;
  }
}

export default CardList;
