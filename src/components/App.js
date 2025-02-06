import React, { Component } from "react";
import CardList from "./CardList/CardList";
import SearchPanel from "./SearchPanel/SearchPanel";
import PaginationComponent from "./PaginationComponent/PaginationComponent";

import "./App.css";

class App extends Component {
  state = {
    urlPart: "a",
    pageNumber: 1,
  };

  changeUrlPart = (urlPart) => {
    this.setState({ urlPart: urlPart });
  };

  changePageNumber = (pageNumber) => {
    this.setState({ pageNumber: pageNumber });
  };

  render() {
    return (
      <div className="App">
        <div className="AppSearch">
          <SearchPanel changeUrlPart={this.changeUrlPart} />
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
      </div>
    );
  }
}

export default App;
