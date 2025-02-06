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
    notloaded: true,
    onlineStatus: false,
    error: null,
  };

  setMovies() {
    let newMovies = new GetData(
      `https://api.themoviedb.org/3/search/movie?query=${this.props.urlPart}&include_adult=false&language=en-US&page=${this.props.pageNumber}`
    );
    console.log("this url", newMovies.url);
    return newMovies;
  }

  takeMovies() {
    this.setMovies()
      .getAllMovies()
      .catch((err) => {
        console.log("error is: ", err.message);
        this.setState({ onError: true });
        this.setState({ errorMassage: err.message });
        this.setState({ errorName: err.name });
      });
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
        this.setState({ notloaded: false });
        console.log("loaded is true");
      })
      .catch((err) => {
        console.log("error is: ", err.message);
        this.setState({ onError: true });
        this.setState({ errorMassage: err.message });
        this.setState({ errorName: err.name });
      });
  }

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
    this.setMovies();

    this.takeMovies();
    this.changeState();
    this.setState({ didMount: true });

    window.addEventListener("online", this.handleOnline);
    window.addEventListener("offline", this.handleOffline);
  }

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate");
    console.log("page is ", this.props.pageNumber);
    if (
      prevProps.urlPart !== this.props.urlPart ||
      prevProps.pageNumber !== this.props.pageNumber
    ) {
      this.setState({ notloaded: true }, () => {
        this.setMovies();
        this.takeMovies();
        this.changeState();
      });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("online", this.handleOnline);
    window.removeEventListener("offline", this.handleOffline);
  }

  render() {
    let cardArr = [];
    if (this.state.cards !== null) {
      if (this.state.cards.length !== 0) {
        for (let i = 0; i < this.state.cards.length; i++) {
          if (this.state.cards[i] !== undefined) {
            cardArr.push(
              <Card key={this.state.cards[i].id} card={this.state.cards[i]} />
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
      console.log("contentRender onlineStatus", this.state.cards);
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
      Array.isArray(this.state.cards) &&
      this.state.cards.length === 0 &&
      this.props.urlPart !== ""
    ) {
      console.log("contentRender arr = 0", this.state.cards);
      return (
        <div className="Alert">
          <Alert
            message="No results found"
            description="Please try again"
            type="info"
          />
        </div>
      );
    } else if (this.state.notloaded) {
      console.log("contentRender notloaded", this.state.cards);
      return (
        <div className="Alert">
          <Spin size="large" />
        </div>
      );
    } else if (this.state.cards !== null && this.props.urlPart !== "") {
      console.log("contentRender cards", this.state.cards);
      return <div className="CardList">{cardArr}</div>;
    } else {
      console.log("contentRender default", this.state.cards);
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

export default CardList;
