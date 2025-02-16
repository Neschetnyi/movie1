import React, { Component } from "react";
import { Tabs } from "antd";
import CardList from "../CardList/CardList";
import SearchPanel from "../SearchPanel/SearchPanel";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import MyContext from "../MyContext/MyContext";
import { Spin } from "antd";

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
    console.log("changing Tab");
  };

  render() {
    const { TabPane } = Tabs;
    let raitedTabContent = this.context.raitingLoaded ? (
      <div className="AppCardlist">
        <CardList
          activeTab={this.state.activeTab}
          cards={this.context.ratedMoviesArray}
        />
      </div>
    ) : (
      <div
        style={{
          width: "100%",
          height: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        ДОБАВОЧНЫЙ СПИН
        <Spin size="large" />
      </div>
    );

    return (
      <Tabs defaultActiveKey="1" onChange={this.callback} centered>
        <TabPane tab="Search" key="1">
          <div className="AppSearch">
            <SearchPanel />
          </div>
          <div className="AppCardlist">
            <CardList
              activeTab={this.state.activeTab}
              cards={this.context.cards}
            />
          </div>
          <div className="AppPagination">
            <PaginationComponent />
          </div>
        </TabPane>
        <TabPane tab="Raited" key="2">
          {raitedTabContent}
          <div className="AppPagination">
            <PaginationComponent />
          </div>
        </TabPane>
      </Tabs>
    );
  }
}

TabList.contextType = MyContext;

export default TabList;
