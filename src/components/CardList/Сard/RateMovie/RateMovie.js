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
    if (!this.context.addRaitinginProcess) {
      console.log("addRaitinginProcess is false i will start normal mod");
      this.context.changeRaitingLoadedFalse();
      this.context.changeAddRaitinginProcessTrue();
      this.setState({ value }, () => {
        AddRaiting(
          this.state.value,
          this.props.guestSessionId,
          this.props.id
        ).then((res) => {
          if (res === null) {
            this.setState({ value: 0 });
            this.context.changeAddRaitinginProcessFalse();
            this.context.changeRaitingLoadedTrue();
            return;
          }
          console.log("after raiting", this.context.guestSessionId);
          console.log("after ViewRatedMovies", res.results);
          this.context.changeRatedMoviesArray(res.results);
          this.context.changeAddRaitinginProcessFalse();
          this.context.changeRaitingLoadedTrue();
          console.log(
            `loading flags: addRaitinginProcess: ${this.context.addRaitinginProcess}, raitingLoaded: ${this.context.raitingLoaded}`
          );
        });
      });
    } else {
      console.log("addRaitinginProcess is true i will start else mod");
      setTimeout(() => {
        console.log("addRaitinginProcess after timeout");
        this.handleChange(value);
      }, 500);
    }
  };

  componentDidMount() {
    console.log("componentDidMount in RateMovie");
    let index = this.context.ratedMoviesArray.findIndex((el, index, array) => {
      return el.id === this.props.id;
    });
    if (index !== -1) {
      this.setState({ value: this.context.ratedMoviesArray[index].rating });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.value !== this.state.value) {
      this.context.changeRatedMoviesArray(this.context.ratedMoviesArray);
    }
  }

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
