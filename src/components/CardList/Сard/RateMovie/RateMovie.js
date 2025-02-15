import React, { Component } from "react";
import { Rate } from "antd";
import AddRaiting from "../../../../servises/addRaiting";
import MyContext from "../../../MyContext/MyContext";
import ViewRatedMovies from "../../../../servises/ViewRatedMovies";

class RateMovie extends Component {
  state = {
    value: 0,
  };

  handleChange = (value) => {
    this.setState({ value }, () => {
      AddRaiting(
        this.state.value,
        this.props.guestSessionId,
        this.props.id
      ).then((res) => {
        console.log("after raiting");
        ViewRatedMovies(this.context.guestSessionId).then((res) => {
          console.log("after ViewRatedMovies", res.results);
          this.context.changeRatedMoviesArray(res.results);
        });
      });
    });
  };

  render() {
    const { value } = this.state;
    return (
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
}

RateMovie.contextType = MyContext;

export default RateMovie;
