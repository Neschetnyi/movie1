import React, { Component } from "react";
import { Pagination } from "antd";
import MyContext from "../MyContext/MyContext";

class PaginationComponent extends Component {
  state = {
    current: 1,
    totalPages: this.props.total,
  };

  onChange = (page) => {
    this.setState({ current: page }, () => {
      this.props.changePage(this.state.current);
    });
  };

  updateTotalPages = () => {
    this.setState({ totalPages: Number(this.props.total) });
  };

  componentDidMount() {
    this.updateTotalPages();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.total !== this.props.total) {
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

export default PaginationComponent;
