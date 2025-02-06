import React, { Component } from "react";
import "./SearchPanel.css";
import _debounce from "lodash/debounce";

class SearchPanel extends Component {
  onChange = (e) => {
    e.preventDefault();
    _debounce(this.props.changeUrlPart, 1500)(e.target.value);
  };

  render() {
    return (
      <input
        className="SearchPanel"
        type="text"
        placeholder="Search for the movie"
        onChange={this.onChange}
      />
    );
  }
}

export default SearchPanel;
