import React, { Component } from "react";

class AverageRaiting extends Component {
  render() {
    return (
      <Avatar
        size={42}
        style={{
          color: "#f56a00",
          backgroundColor: "transparent",
          boxShadow: "inset 0 0 0 1px #f56a00",
        }}
      >
        {this.props.vote_average}
      </Avatar>
    );
  }
}
