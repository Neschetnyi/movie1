import React, { Component } from "react";
import { Pagination } from "antd";
import MyContext from "../MyContext/MyContext";

class PaginationComponent extends Component {
  state = {
    current: 1,
    totalPages: null,
  };

  totalPages = () => {
    console.log("Pagination context", this.context);
    let res = 0;
    if (this.context.cards !== null) {
      this.context.cards.length % 20 === null
        ? (res = this.this.context.cards.length / 20)
        : (res = this.this.context.cards.length / 20 + 1);

      this.setState({ totalPages: res });
    }
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
    this.totalPages();
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
