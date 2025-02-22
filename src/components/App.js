import React, { Component } from "react";
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
    guestSessionId: null,
    ratedMoviesArray: [],
    addRaitinginProcess: false,
    raitingLoaded: false,
    pageOfRaitedMovies: 1,
    totalPagesOfRaitedMovies: 1,
  };

  changePageOfRaitedMovies = (value) => {
    this.setState({ pageOfRaitedMovies: value });
  };

  changeTotalPagesOfRaitedMovies = (value) => {
    this.setState({ totalPagesOfRaitedMovies: value });
  };

  changeAddRaitinginProcessTrue = () => {
    this.setState({ addRaitinginProcess: true });
  };

  changeAddRaitinginProcessFalse = () => {
    this.setState({ addRaitinginProcess: false });
  };
  changeRaitingLoadedTrue = () => {
    this.setState({ raitingLoaded: true });
  };

  changeRaitingLoadedFalse = () => {
    this.setState({ raitingLoaded: false });
  };

  changeRatedMoviesArray = (value) => {
    this.setState({ ratedMoviesArray: value });
  };

  Pages = () => {
    this.setMovies()
      .getPages()
      .then((value) => {
        this.setState({ totalPages: value }, () => {});
      })
      .catch((err) => {
        console.log("error is: ", err.message);
        this.setState({ onError: true });
        this.setState({ errorMassage: err.message });
        this.setState({ errorName: err.name });
      });
  };

  changeNotLoadedTrue = () => {
    this.setState({ notLoaded: true });
  };

  changeNotLoadedFalse = () => {
    this.setState({ notLoaded: false });
  };

  changeCards = () => {
    if (this.state.urlPart === "") {
      this.changeNotLoadedFalse();

      return;
    } else {
      this.changeNotLoadedTrue();

      this.setMovies()
        .getAllMovies()
        .then((value) => {
          if (typeof value === "object") {
            this.setState({ cards: value.results }, () => {});
          }

          this.changeNotLoadedFalse();
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
      this.Pages();
    }
  };

  setSession = () => {
    this.clientSession.getSession().then((response) => {
      console.log(response);
      this.setState({ renderContent: true });
      this.setState({ guestSessionId: response.guest_session_id }, () => {
        console.log("guestSessionId!!!", this.state.guestSessionId);
      });
    });
  };

  setGenres = () => {
    let genres = new GetGenre().getGenres().then((response) => {
      return response;
    });
    return genres;
  };

  setMovies = () => {
    let newMovies = new GetData(
      `https://api.themoviedb.org/3/search/movie?query=${this.state.urlPart}&include_adult=false&language=en-US&page=${this.state.pageNumber}`
    );

    return newMovies;
  };

  changeGenres = () => {
    this.setGenres().then((response) => {
      this.setState({ genres: response.genres }, () => {});
    });
  };

  changeUrlPart = (urlPart) => {
    this.setState({ urlPart: urlPart }, () => {
      this.changeCards();
    });
  };

  changePageNumber = (pageNumber) => {
    this.setState({ pageNumber: pageNumber }, () => {
      this.changeCards();
    });
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
              guestSessionId: this.state.guestSessionId,
              changeRatedMoviesArray: this.changeRatedMoviesArray,
              ratedMoviesArray: this.state.ratedMoviesArray,
              addRaitinginProcess: this.state.addRaitinginProcess,
              raitingLoaded: this.state.raitingLoaded,
              changeAddRaitinginProcessTrue: this.changeAddRaitinginProcessTrue,
              changeAddRaitinginProcessFalse:
                this.changeAddRaitinginProcessFalse,
              changeRaitingLoadedTrue: this.changeRaitingLoadedTrue,
              changeRaitingLoadedFalse: this.changeRaitingLoadedFalse,
              changePageOfRaitedMovies: this.changePageOfRaitedMovies,
              changeTotalPagesOfRaitedMovies:
                this.changeTotalPagesOfRaitedMovies,
              pageOfRaitedMovies: this.state.pageOfRaitedMovies,
              totalPagesOfRaitedMovies: this.state.totalPagesOfRaitedMovies,
            }}
          >
            <TabList
              //
              urlPart={this.state.urlPart}
              pageNumber={this.state.pageNumber}
              changeCards={this.changeCards}
              changeRatedMoviesArray={this.changeRatedMoviesArray}
              cards={this.state.cards}
              genres={this.state.genres}
              guestSessionId={this.state.guestSessionId}
              activeTab={this.state.activeTab}
              notLoaded={this.state.notLoaded}
              totalPages={this.state.totalPages}
              ratedMoviesArray={this.state.ratedMoviesArray}
              totalPagesOfRaitedMovies={this.state.totalPagesOfRaitedMovies}
              raitingLoaded={this.state.raitingLoaded}
              changePageNumber={this.changePageNumber}
              changePageOfRaitedMovies={this.changePageOfRaitedMovies}
              changeRaitingLoadedFalse={this.changeRaitingLoadedFalse}
              changeRaitingLoadedTrue={this.changeRaitingLoadedTrue}
              pageOfRaitedMovies={this.state.pageOfRaitedMovies}
              changeTotalPagesOfRaitedMovies={
                this.changeTotalPagesOfRaitedMovies
              }
              //
            />
          </MyContext.Provider>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default App;
