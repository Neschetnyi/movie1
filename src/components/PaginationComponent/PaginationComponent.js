import React, { Component } from "react";
import { Pagination } from "antd";
import MyContext from "../MyContext/MyContext";

class PaginationComponent extends Component {
  state = {
    current: 1, // Начальное значение для текущей страницы
    totalPages: this.props.total || 1,
  };

  onChange = (page) => {
    this.setState({ current: page }, () => {
      this.props.changePage(page); // Сообщаем родителю о смене страницы
    });
  };

  componentDidUpdate(prevProps, prevState) {
    // Проверяем, изменились ли пропсы
    if (
      prevProps.total !== this.props.total ||
      prevState.totalPages !== this.state.totalPages ||
      prevProps.TabListKey !== this.props.TabListKey
    ) {
      this.setState({ totalPages: this.props.total });
    }

    if (prevProps.current !== this.props.current) {
      this.setState({ current: this.props.current }); // Обновляем текущую страницу
    }
  }

  render() {
    return (
      <Pagination
        current={this.state.current}
        onChange={this.onChange}
        total={this.state.totalPages}
        showSizeChanger={false}
      />
    );
  }
}

export default PaginationComponent;
