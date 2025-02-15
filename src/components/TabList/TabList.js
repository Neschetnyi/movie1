import React, { Component } from "react";
import { Tabs } from "antd";
import CardList from "../CardList/CardList";
import SearchPanel from "../SearchPanel/SearchPanel";
import PaginationComponent from "../PaginationComponent/PaginationComponent";

class TabList extends Component {
  state = {
    activeKey: "1",
    activeTab: "Search",
  };

  callback = (key) => {
    if (key === "1") {
      this.setState({ activeTab: "Search" });
    } else {
      this.setState({ activeTab: "Raited" });
    }
    this.setState({ activeKey: key });
    console.log("changing Tab", this.state.activeTab, this.state.activeKey);
  };

  render() {
    const { TabPane } = Tabs;

    return (
      <Tabs defaultActiveKey="1" onChange={this.callback} centered>
        <TabPane tab="Search" key="1">
          <div className="AppSearch">
            <SearchPanel />
          </div>
          <div className="AppCardlist">
            <CardList activeTab={this.state.activeTab} />
          </div>
          <div className="AppPagination">
            <PaginationComponent />
          </div>
        </TabPane>
        <TabPane tab="Raited" key="2">
          <div className="AppCardlist">
            <CardList activeTab={this.state.activeTab} />
          </div>
          <div className="AppPagination">
            <PaginationComponent />
          </div>
        </TabPane>
      </Tabs>
    );
  }
}

export default TabList;
