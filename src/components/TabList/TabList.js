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
      <Tabs defaultActiveKey="1" onChange={callback} centered>
        <TabPane tab="Search" key="1">
          <div className="AppSearch">
            <SearchPanel />
          </div>
          <div className="AppCardlist">
            <CardList />
          </div>
          <div className="AppPagination">
            <PaginationComponent />
          </div>
        </TabPane>
        <TabPane tab="Raited" key="2">
          Content of Tab Pane 2
        </TabPane>
      </Tabs>
    );
  }
}

export default TabList;
