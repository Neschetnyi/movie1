import React, { Component } from "react";
import { Tabs } from "antd";
import CardList from "../CardList/CardList";
import SearchPanel from "../SearchPanel/SearchPanel";
import PaginationComponent from "../PaginationComponent/PaginationComponent";

class TabList extends Component {
  render() {
    const { TabPane } = Tabs;

    function callback(key) {
      console.log(key);
    }
    return (
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Search" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    );
  }
}

export default TabList;
