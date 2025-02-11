import React, { Component } from "react";
import "./SearchPanel.css";
import _debounce from "lodash/debounce";
import { MyConsumer } from "../MyContext/MyContext";

class SearchPanel extends Component {
  onChange = (e, changeUrlPart) => {
    e.preventDefault();
    _debounce(changeUrlPart, 1500)(e.target.value);
  };

  render() {
    return (
      <MyConsumer>
        {({ changeUrlPart }) => (
          <input
            className="SearchPanel"
            type="text"
            placeholder="Search for the movie"
            onChange={(e) => this.onChange(e, changeUrlPart)}
          />
        )}
      </MyConsumer>
    );
  }
}

export default SearchPanel;
