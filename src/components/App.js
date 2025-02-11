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
  };

  changeUrlPart = (urlPart) => {
    this.setState({ urlPart: urlPart });
  };

  changePageNumber = (pageNumber) => {
    this.setState({ pageNumber: pageNumber });
  };

  componentDidMount() {
    let clientSession = new ClientSession();
    clientSession.getSession().then((response) => {
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
              Data: this.state.Data,
              changeUrlPart: this.changeUrlPart,
              changePageNumber: this.changePageNumber,
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
