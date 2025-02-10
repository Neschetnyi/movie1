import React, { Component } from "react";
import { Pagination } from "antd";

class PaginationComponent extends Component {
  state = {
    current: 1,
  };

  onChange = (page) => {
    console.log(page);

    this.setState(
      {
        current: page,
      },
      () => {
        console.log(this.state.current);
        this.props.changePageNumber(this.state.current);
      }
    );
  };

  render() {
    return (
      <Pagination
        current={this.state.current}
        onChange={this.onChange}
        total={1000}
      />
    );
  }
}

export default PaginationComponent;
