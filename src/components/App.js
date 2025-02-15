import React, { Component } from "react";
import CardList from "./CardList/CardList";
import SearchPanel from "./SearchPanel/SearchPanel";
import PaginationComponent from "./PaginationComponent/PaginationComponent";
import TabList from "./TabList/TabList";
import GetData from "../servises/GetData";
import MyContext from "./MyContext/MyContext";
import "./App.css";
import ClientSession from "../servises/ClientSession";
import GetGenre from "../servises/GetGenre";

class App extends Component {
  clientSession = new ClientSession();

  state = {
    urlPart: "",
    pageNumber: 1,
    renderContent: false,
    id: null,
    cards: null,
    notLoaded: true,
    genres: null,
    DidMount: false,
    totalPages: 0,
  };

  setMovies = () => {
    return new GetData(this.state.urlPart, this.state.pageNumber);
  };

  Pages = () => {
    console.log("totalPages context", this.state.totalPages);
    let res = 0;
    if (
      this.state.cards !== null &&
      this.state.cards.toString() !== "undefined"
    ) {
      console.log(
        "totalPages context",
        this.state.cards.length,
        this.state.cards.toString()
      );
      if (this.state.cards.length % 20 === 0) {
        res = this.state.cards.length / 20;
      } else {
        res = this.state.cards.length / 20 + 1;
      }

      this.setState({ totalPages: res });
    }
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
          this.setState({ cards: value.results }, () => {});
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

  setSession = () => {
    this.clientSession.getSession().then((response) => {
      console.log(response);
      this.setState({ renderContent: true });
    });
  };

  setGenres = () => {
    let genres = new GetGenre().getGenres().then((response) => {
      console.log("feched genres", response);
      return response;
    });
    return genres;
  };

  setMovies = () => {
    let newMovies = new GetData(
      `https://api.themoviedb.org/3/search/movie?query=${this.state.urlPart}&include_adult=false&language=en-US&page=${this.state.pageNumber}`
    );
    console.log("this url", newMovies.url);
    return newMovies;
  };

  changeGenres = () => {
    this.setGenres().then((response) => {
      console.log("changeGenres", response.genres);
      this.setState({ genres: response.genres }, () => {
        console.log("this genres", this.state.genres);
      });
    });
  };

  changeUrlPart = (urlPart) => {
    this.setState({ urlPart: urlPart });
  };

  changePageNumber = (pageNumber) => {
    this.setState({ pageNumber: pageNumber });
  };

  componentDidMount() {
    this.setState({ DidMount: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.DidMount !== this.state.DidMount) {
      this.setSession();
      this.changeGenres();
    }
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
              genres: this.state.genres,
              totalPages: this.state.totalPages,
              changeUrlPart: this.changeUrlPart,
              changePageNumber: this.changePageNumber,
              changeCards: this.changeCards,
              setMovies: this.setMovies,
              Pages: this.Pages,
            }}
          >
            <div className="AppSearch">
              <SearchPanel />
            </div>
            <div className="AppCardlist">
              <CardList />
            </div>
            <div className="AppPagination">
              <PaginationComponent />
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
