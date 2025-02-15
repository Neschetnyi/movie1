import React, { Component } from "react";
import { Pagination } from "antd";
import MyContext from "../MyContext/MyContext";

class PaginationComponent extends Component {
  state = {
    current: 1,
    totalPages: null,
  };

  onChange = (page) => {
    console.log(page);

    this.setState(
      {
        current: page,
      },
      () => {
        console.log("current page is:", this.state.current);
        this.context.changePageNumber(this.state.current);
      }
    );
  };

  componentDidMount() {
    this.updateTotalPages();
  }

  updateTotalPages = () => {
    this.setState({
      totalPages: this.context.totalPages,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.totalPages !== this.context.totalPages) {
      this.updateTotalPages();
    }
  }

  render() {
    return (
      <Pagination
        current={this.state.current}
        onChange={this.onChange}
        total={this.state.totalPages}
      />
    );
  }
}

PaginationComponent.contextType = MyContext;

export default PaginationComponent;
