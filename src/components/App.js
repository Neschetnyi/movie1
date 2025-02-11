import React, { Component } from "react";
import CardList from "./CardList/CardList";
import SearchPanel from "./SearchPanel/SearchPanel";
import PaginationComponent from "./PaginationComponent/PaginationComponent";
import TabList from "./TabList/TabList";
import GetData from "../servises/GetData";
import { MyProvider } from "./MyContext/MyContext";
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

  componentDidMount() {
    this.setState({ Data: this.state.Data });
  }
  render() {
    return (
      <div className="App">
        <MyProvider
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
        </MyProvider>
      </div>
    );
  }
}

export default App;
