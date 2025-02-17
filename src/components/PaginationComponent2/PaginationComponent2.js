import React, { Component } from "react";
import { Pagination } from "antd";
import MyContext from "../MyContext/MyContext";
import addRaiting from "../../servises/addRaiting";
import ViewRatedMovies from "../../servises/ViewRatedMovies";

class PaginationComponent extends Component {
  state = {
    current: this.props.pageOfRaitedMovies,
    totalPagesOfRaitedMovies: this.props.totalPagesOfRaitedMovies,
  };

  onChange = (page) => {
    this.setState({ current: page }, () => {
      this.props.changePageOfRaitedMovies(this.state.current);
    });
  };

  updateTotalPages = () => {
    this.setState({
      totalPagesOfRaitedMovies: Number(this.props.totalPagesOfRaitedMovies),
    });
  };

  componentDidMount() {
    console.log("Detected Mount of in totalPagesOfRaitedMovies (Raited)");
    this.updateTotalPages();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      console.log("Detected change in totalPagesOfRaitedMovies (Raited)");
      this.updateTotalPages();
      this.setState({ current: this.state.current });
      this.setState({
        totalPagesOfRaitedMovies: Number(this.props.totalPagesOfRaitedMovies),
      });
    }

    console.log(
      "componentDidUpdate - current:",
      this.state.current,
      "totalPages:",
      this.state.totalPagesOfRaitedMovies
    );
  }

  render() {
    console.log(
      "Rendering PaginationComponent with current:",
      this.state.current,
      "totalPages:",
      this.state.totalPagesOfRaitedMovies
    );
    return (
      <Pagination
        current={this.state.current}
        onChange={this.onChange}
        total={20}
        showSizeChanger={false}
        showQuickJumper
      />
    );
  }
}

// PaginationComponent.contextType = MyContext;

export default PaginationComponent;
