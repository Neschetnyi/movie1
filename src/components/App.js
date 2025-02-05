import React, { Component } from "react";
import CardList from "./CardList/CardList";
import SearchPanel from "./SearchPanel/SearchPanel";
import "./App.css";

class App extends Component {
  state = {
    urlPart: "a",
  };

  changeUrlPart = (urlPart) => {
    this.setState({ urlPart: urlPart });
  };

  render() {
    console.log("App", this.state.urlPart);
    return (
      <div className="App">
        <div className="AppSearch">
          <SearchPanel changeUrlPart={this.changeUrlPart} />
        </div>
        <div className="AppCardlist">
          <CardList urlPart={this.state.urlPart} />
        </div>
      </div>
    );
  }
}

export default App;
