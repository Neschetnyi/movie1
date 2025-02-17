async function AddRaiting(raiting, sessionId, movieId, page) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODM2YTY2ODE2ZmYwMjY0ODJmZTA1ZDdjNGUwMTM0NSIsIm5iZiI6MTczOTczNjc5NC4wMzksInN1YiI6IjY3YjI0NmRhNWFjYTVhNzFkMjlmYmYyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HFClysNNGSn1__4H7W1LlrkkkqckuyfNlWXnJJ7mlIU",
    },
    body: `{"value":${raiting}}`, // Используем правильный синтаксис для тела запроса
  };

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${sessionId}`,
      options
    );

    if (!res.ok) {
      console.log(`Ошибка HTTP! статус: ${res.status}`);
    }

    const resJson = await res.json();
    console.log("Ответ после добавления рейтинга:", raiting, resJson);
  } catch (err) {
    console.log("Ошибка при POST-запросе:", err.message);
  }

  const options2 = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhODM2YTY2ODE2ZmYwMjY0ODJmZTA1ZDdjNGUwMTM0NSIsIm5iZiI6MTczOTczNjc5NC4wMzksInN1YiI6IjY3YjI0NmRhNWFjYTVhNzFkMjlmYmYyZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HFClysNNGSn1__4H7W1LlrkkkqckuyfNlWXnJJ7mlIU",
    },
  };

  try {
    const res2 = await fetch(
      `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`,
      options2
    );

    if (!res2.ok) {
      console.log(`Ошибка HTTP! статус: ${res2.status}`);
      throw new Error(`Ошибка HTTP: ${res2.status}`);
    }

    const response = await res2.json();
    return response;
  } catch (err) {
    if (err.message.includes("404")) {
      alert("Ошибка сервера, попробуйте позже.");
      console.log("Ошибка при GET-запросе:", err.message);
    }
    return null;
  }
}

export default AddRaiting;
