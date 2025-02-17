import React, { Component } from "react";
import { Tabs } from "antd";
import CardList from "../CardList/CardList";
import SearchPanel from "../SearchPanel/SearchPanel";
import { Spin } from "antd";
import ViewRatedMovies from "../../servises/ViewRatedMovies";
import { Pagination } from "antd";

class TabList extends Component {
  state = {
    activeKey: "1",
    activeTab: "Search",
    current: 1,
    currentInRaited: 1,
    currentInSearch: 1,
    totalPages: this.props.totalPages,
  };

  onChange = (key) => {
    if (key === "1") {
      this.setState(
        { activeTab: "Search" },
        console.log("changing Tab to 'Search'", this.state.activeTab)
      );
      this.setState({ totalPages: this.props.totalPages });
      this.setState({ current: this.props.pageNumber });
    } else {
      this.setState(
        { activeTab: "Raited" },
        console.log("changing Tab to 'Raited'", this.state.activeTab)
      );
      this.setState({ totalPages: this.props.totalPagesOfRaitedMovies * 10 });
      console.log(
        "totalPagesOfRaitedMovies type is",
        typeof this.props.totalPagesOfRaitedMovies
      );

      this.setState({ totalPages: this.props.totalPagesOfRaitedMovies });
      this.setState({ current: this.props.pageOfRaitedMovies });
    }
    this.setState({ activeKey: key });
    console.log("changing Tab", key);
  };

  onChangePagination = (page) => {
    this.setState({ current: page }, () => {
      if (this.state.activeTab === "Search") this.props.changePageNumber(page);
      else if (this.state.activeTab === "Raited") {
        this.props.changePageOfRaitedMovies(page);
      }
    });
  };

  componentDidMount() {
    console.log("TabList componentDidMount");
    this.props.changeRaitingLoadedFalse();
    this.setState({ totalPages: this.props.totalPages });
    if (this.props.ratedMoviesArray.length !== 0) {
      ViewRatedMovies(this.props.guestSessionId, this.props.pageOfRaitedMovies)
        .then((res) => {
          this.props.changeRatedMoviesArray(res.results);
          return Promise.resolve();
        })
        .then((res) => this.props.changeRaitingLoadedTrue());
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.activeTab !== this.state.activeTab ||
      prevState.activeKey !== this.state.activeKey ||
      prevProps.totalPagesOfRaitedMovies !==
        this.props.totalPagesOfRaitedMovies ||
      prevProps.pageOfRaitedMovies !== this.props.pageOfRaitedMovies ||
      prevProps.totalPages !== this.props.totalPages ||
      prevProps.pageNumber !== this.props.pageNumber
    ) {
      console.log("TabList is changed");

      if (this.state.activeTab === "Raited") {
        this.setState({ totalPages: this.props.totalPagesOfRaitedMovies * 10 });
      } else {
        this.setState({ totalPages: this.props.totalPages });
      }

      this.props.changeRaitingLoadedFalse();
      if (this.props.ratedMoviesArray.length !== 0) {
        ViewRatedMovies(
          this.props.guestSessionId,
          this.props.pageOfRaitedMovies
        )
          .then((res) => {
            this.props.changeRatedMoviesArray(res.results);
            this.props.changeTotalPagesOfRaitedMovies(res.total_pages);
            return Promise.resolve();
          })
          .then((res) => this.props.changeRaitingLoadedTrue());
      }
      console.log(
        "in tab this.props.totalPagesOfRaitedMovies",
        this.props.totalPagesOfRaitedMovies
      );
    }
  }

  render() {
    let raitedTabContent = true ? (
      <div className="AppCardlist">
        <CardList
          cards={this.props.ratedMoviesArray}
          raitingLoaded={this.props.raitingLoaded}
          genres={this.props.genres}
          urlPart={this.props.urlPart}
          pageNumber={this.props.pageNumber}
          guestSessionId={this.props.guestSessionId}
          notLoaded={this.props.notLoaded}
          changeRatedMoviesArray={this.props.changeRatedMoviesArray}
          changeCards={this.props.changeCards}
          activeTab={this.state.activeTab}
          //
          ratedMoviesArray={this.props.ratedMoviesArray}
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
                raitingLoaded={this.props.raitingLoaded}
                genres={this.props.genres}
                urlPart={this.props.urlPart}
                pageNumber={this.props.pageNumber}
                guestSessionId={this.props.guestSessionId}
                notLoaded={this.props.notLoaded}
                changeRatedMoviesArray={this.props.changeRatedMoviesArray}
                changeCards={this.props.changeCards}
                activeTab={this.state.activeTab}
              />
            </div>
          </>
        ),
      },
      {
        key: "2",
        label: "Raited",
        children: raitedTabContent,
      },
    ];

    return (
      <>
        <Tabs
          defaultActiveKey="1"
          items={items}
          onChange={this.onChange}
          centered
        />
        <div className="AppPagination">
          <Pagination
            current={this.state.current}
            onChange={this.onChangePagination}
            total={this.state.totalPages}
            showSizeChanger={false}
          />
        </div>
      </>
    );
  }
}

export default TabList;
