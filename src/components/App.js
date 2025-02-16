import React, { Component } from "react";
import TabList from "./TabList/TabList";
import GetData from "../servises/GetData";
import MyContext from "./MyContext/MyContext";
import "./App.css";
import ClientSession from "../servises/ClientSession";
import GetGenre from "../servises/GetGenre";
import AddRaiting from "../servises/addRaiting";

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
    this.setState(
      { ratedMoviesArray: value },
      console.log("ratedMoviesArray", value)
    );
  };

  Pages = () => {
    this.setMovies()
      .getPages()
      .then((value) => {
        this.setState({ totalPages: value }, () => {
          console.log("totalPages after fetching", this.state.totalPages);
        });
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
      console.log(
        "NotLoaded set to 'false' in the end of changeCards function",
        this.state.notLoaded
      );
      return;
    } else {
      this.changeNotLoadedTrue();
      console.log(
        "NotLoaded set to 'true' in the start of changeCards function",
        this.state.notLoaded
      );
      this.setMovies()
        .getAllMovies()
        .then((value) => {
          if (typeof value === "object") {
            this.setState({ cards: value.results }, () => {});
          }

          this.changeNotLoadedFalse();
          console.log(
            "NotLoaded set to 'false' in the end of changeCards function",
            this.state.notLoaded
          );
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
      console.log("feched genres", response);
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
      console.log("changeGenres", response.genres);
      this.setState({ genres: response.genres }, () => {
        console.log("this genres", this.state.genres);
      });
    });
  };

  changeUrlPart = (urlPart) => {
    this.setState({ urlPart: urlPart }, () => {
      console.log("urlPart is changed and now is:", this.state.urlPart);
      this.changeCards();
    });
  };

  changePageNumber = (pageNumber) => {
    this.setState({ pageNumber: pageNumber }, () => {
      console.log("urlPart", this.state.urlPart);
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
            }}
          >
            <TabList />
          </MyContext.Provider>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

export default App;
