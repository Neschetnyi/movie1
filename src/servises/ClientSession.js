class ClientSession {
  options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODM2YTY2ODE2ZmYwMjY0ODJmZTA1ZDdjNGUwMTM0NSIsIm5iZiI6MTczOTczNjc5NC4wMzksInN1YiI6IjY3YjI0NmRhNWFjYTVhNzFkMjlmYmYyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HFClysNNGSn1__4H7W1LlrkkkqckuyfNlWXnJJ7mlIU",
    },
  };

  constructor(url) {
    this.url = "https://api.themoviedb.org/3/authentication/guest_session/new";
  }

  async getSession(url, options) {
    let res = await fetch(this.url, this.options)
      .then((res) => res.json())
      .catch((err) => console.error(err));

    return res;
  }
}

export default ClientSession;
