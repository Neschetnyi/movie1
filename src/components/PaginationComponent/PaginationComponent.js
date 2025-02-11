import React, { Component } from "react";
import { Pagination } from "antd";
import MyContext from "../MyContext/MyContext";

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
        this.context.changePageNumber(this.state.current);
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

PaginationComponent.contextType = MyContext;

export default PaginationComponent;
