import React, { Component } from "react";
import Card from "./Сard/Сard";
import "./CardList.css";
import GetData from "../../servises/GetData";
import { Spin } from "antd";
import { Alert } from "antd";

class CardList extends Component {
  state = {
    cards: null,
    onError: false,
    errorMassage: "",
    errorName: "",
    loaded: false,
    onlineStatus: false,
    arrLength: false,
  };

  setMovies() {
    console.log("setMovies", this.props);
    let newMovies = new GetData(
      `https://api.themoviedb.org/3/search/movie?query=${this.props.urlPart}&include_adult=false&language=en-US&page=1`
    );
    return newMovies;
  }

  takeMovies() {
    console.log("state movies: ", this.setMovies());
    this.setMovies().getAllMovies();
  }
  changeState() {
    this.setMovies()
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

  changeStateArrLength() {
    this.setState({ arrLength: !this.state.arrLength });
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
    this.setMovies();

    this.takeMovies();
    this.changeState();
    this.setState({ didMount: true });

    window.addEventListener("online", this.handleOnline);
    window.addEventListener("offline", this.handleOffline);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.urlPart !== this.props.urlPart) {
      this.setMovies();
      this.takeMovies();
      this.changeState();
    }
  }

  render() {
    console.log("state is: ", this.state.cards);
    let cardArr = [];
    if (this.state.cards !== null) {
      console.log("cards is not null", this.state.cards);
      if (this.state.cards.length !== 0) {
        for (let i = 0; i < 6; i++) {
          cardArr.push(
            <Card key={this.state.cards[i].id} card={this.state.cards[i]} />
          );
        }
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
