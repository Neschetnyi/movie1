class GetData {
  url =
    "https://api.themoviedb.org/3/search/movie?query=a&include_adult=false&language=en-US&page=1";
  options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTc2OTJjZDJkMDc2MWMyMTBlM2U3OTEyYjM3ODVmZiIsIm5iZiI6MTczODU4MDQ4MC4xMzc5OTk4LCJzdWIiOiI2N2EwYTIwMGFjNWE3OTUxYjljYjg4YmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6ps5tpaC0EvpAYP-JToYDZE5E_I5HlxSyhsi4OpM6tU",
    },
  };

  async getResources(url, options) {
    const res = await fetch(url, options);
    await res.then((value) => {
      console.log(value.json());
    });
    return await res.json();
  }

  async getAllMovies() {
    let allMovies = await this.getResources(this.url, this.options);
    return allMovies;
  }
}

const getData = new GetData();

getData.getAllMovies().then((value) => {
  console.log(value);
});

export default GetData;
