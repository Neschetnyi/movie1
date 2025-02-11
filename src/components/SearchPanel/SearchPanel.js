import React, { Component } from "react";
import "./SearchPanel.css";
import _debounce from "lodash/debounce";
import MyContext from "../MyContext/MyContext";

class SearchPanel extends Component {
  onChange = (e, changeUrlPart) => {
    e.preventDefault();
    _debounce(changeUrlPart, 1500)(e.target.value);
  };

  render() {
    const { changeUrlPart } = this.context;
    return (
      <input
        className="SearchPanel"
        type="text"
        placeholder="Search for the movie"
        onChange={(e) => this.onChange(e, changeUrlPart)}
      />
    );
  }
}

SearchPanel.contextType = MyContext;

export default SearchPanel;
