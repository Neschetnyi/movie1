import React, { Component } from "react";
import { Pagination } from "antd";
import MyContext from "../MyContext/MyContext";

class PaginationComponent2 extends Component {
  state = {
    current: 1,
    totalPages: this.props.totalPages,
  };

  onChange = (page) => {
    this.setState({ current: page }, () => {
      this.props.changePageNumber(this.state.current);
    });
  };

  updateTotalPages = () => {
    this.setState({ totalPages: Number(this.props.totalPages) });
  };

  componentDidMount() {
    this.updateTotalPages();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.totalPages !== this.props.totalPages) {
      console.log("Detected change in totalPages (Raited)");
      this.updateTotalPages();
    }

    console.log(
      "componentDidUpdate - current:",
      this.state.current,
      "totalPages:",
      this.state.totalPages
    );
  }

  render() {
    console.log(
      "Rendering PaginationComponent with current:",
      this.state.current,
      "totalPages:",
      this.state.totalPages
    );
    return (
      <Pagination
        current={this.state.current}
        onChange={this.onChange}
        total={this.state.totalPages}
        showSizeChanger={false}
        showQuickJumper
      />
    );
  }
}

// PaginationComponent2.contextType = MyContext;

export default PaginationComponent2;
