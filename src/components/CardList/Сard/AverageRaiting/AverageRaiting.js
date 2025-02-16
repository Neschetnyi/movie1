import React, { Component } from "react";
import { Avatar } from "antd";
import "./AverageRaiting.css";

class AverageRaiting extends Component {
  state = {
    colors: ["#E90000", "#E97E00", "#E9D100", "#66E900"],
  };

  render() {
    let color = "";
    if (this.props.vote_average >= 7) {
      color = this.state.colors[3];
    } else if (this.props.vote_average >= 5) {
      color = this.state.colors[2];
    } else if (this.props.vote_average >= 3) {
      color = this.state.colors[1];
    } else {
      color = this.state.colors[0];
    }
    return (
      <Avatar
        size={42}
        style={{
          color: "black",
          backgroundColor: "transparent",
          boxShadow: `inset 0 0 0 2px ${color}`,
        }}
      >
        {Math.trunc(this.props.vote_average * 10) / 10}
      </Avatar>
    );
  }
}

export default AverageRaiting;
