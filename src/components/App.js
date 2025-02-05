import React, { Component } from "react";
import CardList from "./CardList/CardList";
import SearchPanel from "./SearchPanel/SearchPanel";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="AppSearch">
          <SearchPanel />
        </div>
        <div className="AppCardlist">
          <CardList />
        </div>
      </div>
    );
  }
}

export default App;
