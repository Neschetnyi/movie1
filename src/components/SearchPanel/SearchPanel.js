import React, { Component } from "react";
import "./SearchPanel.css";

class SearchPanel extends Component {
  render() {
    return (
      <input
        className="SearchPanel"
        type="text"
        placeholder="Search for the movie"
      />
    );
  }
}

export default SearchPanel;
