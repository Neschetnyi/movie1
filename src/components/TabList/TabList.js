import React, { Component } from "react";
import { Tabs } from "antd";

class TabList extends Component {
  render() {
    const { TabPane } = Tabs;

    function callback(key) {
      console.log(key);
    }
    return (
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Tab 1" key="1">
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
