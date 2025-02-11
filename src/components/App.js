import React, { Component } from "react";
import CardList from "./CardList/CardList";
import SearchPanel from "./SearchPanel/SearchPanel";
import PaginationComponent from "./PaginationComponent/PaginationComponent";
import TabList from "./TabList/TabList";
import GetData from "../servises/GetData";
import MyContext from "./MyContext/MyContext";
import "./App.css";
import ClientSession from "../servises/ClientSession";

class App extends Component {
  state = {
    urlPart: "a",
    pageNumber: 1,
    renderContent: false,
    id: null,
    cards: null,
    notLoaded: true,
  };

  changeNotLoadedTrue = () => {
    this.setState({ notLoaded: true });
  };

  changeNotLoadedFalse = () => {
    this.setState({ notLoaded: false });
  };

  changeCards = () => {
    this.changeNotLoadedTrue();
    console.log("NotLoaded", this.state.notLoaded);
    this.setMovies()
      .getAllMovies()
      .then((value) => {
        if (typeof value === "object") {
          this.setState({ cards: value.results });
        }

        this.changeNotLoadedFalse();
        console.log("NotLoaded", this.state.notLoaded);
      })
      .catch((err) => {
        console.log("error is: ", err.message);
        this.setState({ onError: true });
        this.setState({ errorMassage: err.message });
        this.setState({ errorName: err.name });
      })
      .catch((err) => {
        console.log("error is: ", err.message);
        this.setState({ onError: true });
        this.setState({ errorMassage: err.message });
        this.setState({ errorName: err.name });
      });
  };

  setMovies = () => {
    let newMovies = new GetData(
      `https://api.themoviedb.org/3/search/movie?query=${this.state.urlPart}&include_adult=false&language=en-US&page=${this.state.pageNumber}`
    );
    console.log("this url", newMovies.url);
    return newMovies;
  };

  changeUrlPart = (urlPart) => {
    this.setState({ urlPart: urlPart });
  };

  changePageNumber = (pageNumber) => {
    this.setState({ pageNumber: pageNumber });
  };

  componentDidMount() {
    let clientSession = new ClientSession().getSession().then((response) => {
      this.setState({ renderContent: true });
    });
  }

  render() {
    if (this.state.renderContent) {
      return (
        <div className="App">
          <MyContext.Provider
            value={{
              urlPart: this.state.urlPart,
              pageNumber: this.state.pageNumber,
              cards: this.state.cards,
              notLoaded: this.state.notLoaded,
              changeUrlPart: this.changeUrlPart,
              changePageNumber: this.changePageNumber,
              changeCards: this.changeCards,
              setMovies: this.setMovies,
            }}
          >
            <div className="AppSearch">
              <SearchPanel />
            </div>
            <div className="AppCardlist">
              <CardList
                urlPart={this.state.urlPart}
                pageNumber={this.state.pageNumber}
              />
            </div>
            <div className="AppPagination">
              <PaginationComponent changePageNumber={this.changePageNumber} />
            </div>
          </MyContext.Provider>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default App;
