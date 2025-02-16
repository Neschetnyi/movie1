import React, { Component } from "react";
import { Tabs } from "antd";
import CardList from "../CardList/CardList";
import SearchPanel from "../SearchPanel/SearchPanel";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
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
    console.log("TabList render", this.props.ratedMoviesArray);

    let raitedTabContent = this.props.raitingLoaded ? (
      <div className="AppCardlist">
        <CardList
          cards={this.props.ratedMoviesArray}
          ratedMoviesArray={this.props.ratedMoviesArray}
          raitingLoaded={this.props.raitingLoaded}
          genres={this.props.genres}
          urlPart={this.props.urlPart}
          pageNumber={this.props.pageNumber}
          totalPages={this.props.totalPages}
          guestSessionId={this.props.guestSessionId}
          notLoaded={this.props.notLoaded}
          addRaitinginProcess={this.props.addRaitinginProcess}
          changeRatedMoviesArray={this.props.changeRatedMoviesArray}
          changeAddRaitinginProcessTrue={
            this.props.changeAddRaitinginProcessTrue
          }
          changeAddRaitinginProcessFalse={
            this.props.changeAddRaitinginProcessFalse
          }
          changeRaitingLoadedTrue={this.props.changeRaitingLoadedTrue}
          changeRaitingLoadedFalse={this.props.changeRaitingLoadedFalse}
          changeCards={this.props.changeCards}
          Pages={this.props.Pages}
          changeUrlPart={this.props.changeUrlPart}
          changePageNumber={this.props.changePageNumber}
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
              cards={this.props.cards}
              ratedMoviesArray={this.props.ratedMoviesArray}
              raitingLoaded={this.props.raitingLoaded}
              genres={this.props.genres}
              urlPart={this.props.urlPart}
              pageNumber={this.props.pageNumber}
              totalPages={this.props.totalPages}
              guestSessionId={this.props.guestSessionId}
              notLoaded={this.props.notLoaded}
              addRaitinginProcess={this.props.addRaitinginProcess}
              changeRatedMoviesArray={this.props.changeRatedMoviesArray}
              changeAddRaitinginProcessTrue={
                this.props.changeAddRaitinginProcessTrue
              }
              changeAddRaitinginProcessFalse={
                this.props.changeAddRaitinginProcessFalse
              }
              changeRaitingLoadedTrue={this.props.changeRaitingLoadedTrue}
              changeRaitingLoadedFalse={this.props.changeRaitingLoadedFalse}
              changeCards={this.props.changeCards}
              Pages={this.props.Pages}
              changeUrlPart={this.props.changeUrlPart}
              changePageNumber={this.props.changePageNumber}
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

export default TabList;
/*

*/
