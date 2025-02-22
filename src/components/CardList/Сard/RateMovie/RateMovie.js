import React, { Component } from "react";
import { Rate } from "antd";
import AddRaiting from "../../../../servises/addRaiting";
import MyContext from "../../../MyContext/MyContext";

class RateMovie extends Component {
  state = {
    value: 0,
  };

  handleChange = (value) => {
    if (!this.context.addRaitinginProcess) {
      this.context.changeRaitingLoadedFalse();
      this.context.changeAddRaitinginProcessTrue();
      this.setState({ value }, () => {
        AddRaiting(
          this.state.value,
          this.props.guestSessionId,
          this.props.id,
          this.context.pageOfRaitedMovies
        ).then((res) => {
          if (res === null) {
            this.setState({ value: 0 });
            this.context.changeAddRaitinginProcessFalse();
            this.context.changeRaitingLoadedTrue();
            return;
          }

          this.context.changeRatedMoviesArray(res.results);
          this.context.changePageOfRaitedMovies(res.page);
          console.log("server total pages", res.total_pages);

          this.context.changeTotalPagesOfRaitedMovies(res.total_pages);
          this.context.changeAddRaitinginProcessFalse();
          this.context.changeRaitingLoadedTrue();
        });
      });
    } else {
      setTimeout(() => {
        console.log("addRaitinginProcess after timeout");
        this.handleChange(value);
      }, 500);
    }
  };

  componentDidMount() {
    if (
      this.context.ratedMoviesArray &&
      this.context.ratedMoviesArray.length > 0
    ) {
      let index = this.context.ratedMoviesArray.findIndex(
        (el, index, array) => {
          return el.id === this.props.id;
        }
      );
      if (index !== -1) {
        this.setState({ value: this.context.ratedMoviesArray[index].rating });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.context.changeRatedMoviesArray(this.context.ratedMoviesArray);
    }
  }

  render() {
    const { value } = this.state;
    let rate = null;
    console.log("active tab in render RateMovie", this.props.activeTab);
    if (this.props.activeTab === "Raited") {
      rate = (
        <span>
          <Rate
            count={10}
            allowHalf={true}
            onChange={this.handleChange}
            value={value}
            style={{ fontSize: 16, color: "#9e6767" }}
            defaultValue={0}
            disabled
          />
        </span>
      );
    } else {
      rate = (
        <span>
          <Rate
            count={10}
            allowHalf={true}
            onChange={this.handleChange}
            value={value}
            style={{ fontSize: 16 }}
            defaultValue={0}
          />
        </span>
      );
    }
    return rate;
  }
}

RateMovie.contextType = MyContext;

export default RateMovie;
