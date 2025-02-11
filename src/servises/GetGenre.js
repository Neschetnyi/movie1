class GetGenre {
  options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTc2OTJjZDJkMDc2MWMyMTBlM2U3OTEyYjM3ODVmZiIsIm5iZiI6MTczODU4MDQ4MC4xMzc5OTk4LCJzdWIiOiI2N2EwYTIwMGFjNWE3OTUxYjljYjg4YmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6ps5tpaC0EvpAYP-JToYDZE5E_I5HlxSyhsi4OpM6tU",
    },
  };

  constructor(url) {
    this.url = "https://api.themoviedb.org/3/authentication/guest_session/new";
  }

  async getGenres(id, options) {
    let res = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      this.options
    )
      .then((res) => res.json())
      .catch((err) => console.error(err));
    return res;
  }
}

export default GetGenre;
