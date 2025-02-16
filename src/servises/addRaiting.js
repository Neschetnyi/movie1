async function AddRaiting(raiting, sessionId, movieId) {
  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json;charset=utf-8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTc2OTJjZDJkMDc2MWMyMTBlM2U3OTEyYjM3ODVmZiIsIm5iZiI6MTczODU4MDQ4MC4xMzc5OTk4LCJzdWIiOiI2N2EwYTIwMGFjNWE3OTUxYjljYjg4YmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6ps5tpaC0EvpAYP-JToYDZE5E_I5HlxSyhsi4OpM6tU",
    },
    body: `{"value":${raiting}}`, // Используем правильный синтаксис для тела запроса
  };
  console.log("session Id перед fetch: ", sessionId);

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
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTc2OTJjZDJkMDc2MWMyMTBlM2U3OTEyYjM3ODVmZiIsIm5iZiI6MTczODU4MDQ4MC4xMzc5OTk4LCJzdWIiOiI2N2EwYTIwMGFjNWE3OTUxYjljYjg4YmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.6ps5tpaC0EvpAYP-JToYDZE5E_I5HlxSyhsi4OpM6tU",
    },
  };

  try {
    const res2 = await fetch(
      `https://api.themoviedb.org/3/guest_session/${sessionId}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
      options2
    );

    if (!res2.ok) {
      console.log(`Ошибка HTTP! статус: ${res2.status}`);
      return null;
    }

    const response = await res2.json();
    return response;
  } catch (err) {
    console.log("Ошибка при GET-запросе:", err.message);
    if (err.message.includes("404")) {
      alert("Ошибка сервера, попробуйте позже.");
    }
  }
}

export default AddRaiting;
