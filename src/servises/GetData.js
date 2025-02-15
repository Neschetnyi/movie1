class GetData {
  options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTc2OTJjZDJkMDc2MWMyMTBlM2U3OTEyYjM3ODVmZiIsIm5iZiI6MTczODU4MDQ4MC4xMzc5OTk4LCJzdWIiOiI2N2EwYTIwMGFjNWE3OTUxYjljYjg4YmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6ps5tpaC0EvpAYP-JToYDZE5E_I5HlxSyhsi4OpM6tU",
    },
  };

  constructor(url) {
    this.url = url;
  }

  async getResources(url, options) {
    let res = await fetch(url, options).then((res) => res.json());
    console.log("search response: ", res);

    return res;
  }

  async getAllMovies() {
    let allMovies = await this.getResources(this.url, this.options);
    return allMovies;
  }

  async getPages() {
    let pages = await this.getResources(this.url, this.options).then(
      (res) => res.total_pages
    );
    console.log("fetching number of pages: ", pages);

    return pages;
  }
}

export default GetData;
