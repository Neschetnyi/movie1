class GetData {
  options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODM2YTY2ODE2ZmYwMjY0ODJmZTA1ZDdjNGUwMTM0NSIsIm5iZiI6MTczOTczNjc5NC4wMzksInN1YiI6IjY3YjI0NmRhNWFjYTVhNzFkMjlmYmYyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HFClysNNGSn1__4H7W1LlrkkkqckuyfNlWXnJJ7mlIU",
    },
  };

  constructor(url) {
    this.url = url;
  }

  async getResources(url, options) {
    let res = await fetch(url, options).then((res) => res.json());

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

    return pages;
  }
}

export default GetData;
