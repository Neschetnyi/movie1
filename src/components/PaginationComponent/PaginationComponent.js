import React, { Component } from "react";
import { Pagination } from "antd";
import MyContext from "../MyContext/MyContext";

class PaginationComponent extends Component {
  state = {
    current: 1,
    totalPages: this.props.totalPages,
  };

  onChange = (page) => {
    console.log(page);

    this.setState(
      {
        current: page,
      },
      () => {
        console.log("current page is:", this.state.current);
        this.props.changePageNumber(this.state.current);
      }
    );
  };

  updateTotalPages = () => {
    this.setState({
      totalPages: Number(this.props.totalPages),
    });
  };

  componentDidMount() {
    this.updateTotalPages();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.totalPages !== this.props.totalPages ||
      prevProps.totalPages !== this.props.totalPages
    ) {
      console.log("totalPages is:", this.props.totalPages);
      console.log("prev totalPages is:", prevState.totalPages);
      this.setState({
        totalPages: Number(this.props.totalPages),
      });
      this.updateTotalPages();
    }
  }

  render() {
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

// PaginationComponent.contextType = MyContext;

export default PaginationComponent;
