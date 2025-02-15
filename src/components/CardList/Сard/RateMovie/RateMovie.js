import React, { Component } from "react";
import { Rate } from "antd";
import AddRaiting from "../../../../servises/addRaiting";

class RateMovie extends Component {
  state = {
    value: 0,
  };

  handleChange = (value) => {
    this.setState({ value }, () => {
      AddRaiting(this.state.value, this.props.guestSessionId, this.props.id);
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

export default RateMovie;
