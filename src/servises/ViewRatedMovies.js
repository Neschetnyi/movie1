async function ViewRatedMovies(sessionId, page) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODM2YTY2ODE2ZmYwMjY0ODJmZTA1ZDdjNGUwMTM0NSIsIm5iZiI6MTczOTczNjc5NC4wMzksInN1YiI6IjY3YjI0NmRhNWFjYTVhNzFkMjlmYmYyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HFClysNNGSn1__4H7W1LlrkkkqckuyfNlWXnJJ7mlIU",
    },
  };
  console.log("ViewRatedMovies", sessionId, page);

  let response = await fetch(
    `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
    options
  )
    .then((res) => res.json())

    .catch((err) => console.error(err));

  return response;
}

export default ViewRatedMovies;
