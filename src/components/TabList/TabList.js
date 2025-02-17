import React, { Component } from "react";
import { Tabs } from "antd";
import CardList from "../CardList/CardList";
import SearchPanel from "../SearchPanel/SearchPanel";
import PaginationComponent from "../PaginationComponent/PaginationComponent";
import PaginationComponent2 from "../PaginationComponent2/PaginationComponent2";
import { Spin } from "antd";
import ViewRatedMovies from "../../servises/ViewRatedMovies";

class TabList extends Component {
  state = {
    activeKey: "1",
    activeTab: "Search",
  };

  onChange = (key) => {
    if (key === "1") {
      this.setState({ activeTab: "Search" });
    } else {
      this.setState({ activeTab: "Raited" });
    }
    this.setState({ activeKey: key });
    console.log("changing Tab", key);
  };

  componentDidMount() {
    console.log("TabList componentDidMount");
    this.props.changeRaitingLoadedFalse();
    ViewRatedMovies(this.props.guestSessionId, this.props.pageOfRaitedMovies)
      .then((res) => {
        this.props.changeRatedMoviesArray(res.results);
        return Promise.resolve();
      })
      .then((res) => this.props.changeRaitingLoadedTrue());
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.activeKey !== this.state.activeKey ||
      prevProps.totalPagesOfRaitedMovies !==
        this.props.totalPagesOfRaitedMovies ||
      prevProps.pageOfRaitedMovies !== this.props.pageOfRaitedMovies
    ) {
      this.props.changeTotalPagesOfRaitedMovies(
        this.props.totalPagesOfRaitedMovies
      );
      this.props.changeRaitingLoadedFalse();
      ViewRatedMovies(this.props.guestSessionId, this.props.pageOfRaitedMovies)
        .then((res) => {
          this.props.changeRatedMoviesArray(res.results);
          return Promise.resolve();
        })
        .then((res) => this.props.changeRaitingLoadedTrue());
      console.log(
        "in tab this.props.totalPagesOfRaitedMovies",
        this.props.totalPagesOfRaitedMovies
      );
    }
  }

  render() {
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

    const items = [
      {
        key: "1",
        label: "Search",
        children: (
          <>
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
              <PaginationComponent
                key={this.state.activeKey}
                TabListKey={this.state.activeKey}
                changePage={this.props.changePageNumber}
                total={this.props.totalPages}
              />
            </div>
          </>
        ),
      },
      {
        key: "2",
        label: "Raited",
        children: (
          <>
            {raitedTabContent}
            <div className="AppPagination">
              <PaginationComponent
                key={this.state.activeKey}
                TabListKey={this.state.activeKey}
                changePage={this.props.changePageOfRaitedMovies}
                total={this.props.totalPagesOfRaitedMovies}
              />
            </div>
          </>
        ),
      },
    ];

    return (
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={this.onChange}
        centered
      />
    );
  }
}

export default TabList;
/*
 <PaginationComponent2
                key={this.state.activeKey}
                changePageOfRaitedMovies={this.props.changePageOfRaitedMovies}
                totalPagesOfRaitedMovies={this.props.totalPagesOfRaitedMovies}
                pageOfRaitedMovies={this.props.pageOfRaitedMovies}
                changeRatedMoviesArray={this.props.changeRatedMoviesArray}
                guestSessionId={this.props.guestSessionId}
              />
*/
