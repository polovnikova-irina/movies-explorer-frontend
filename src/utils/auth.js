export const BASE_URL = "https://api.movies.park.nomoredomainsrocks.ru";

// const checkResponse = (res) => {
//   return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
// };

const checkResponse = (res) => {
  if (!res.ok) {
    console.error(`Ошибка: ${res.status}`);
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
};

export const register = (name, email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  }).then(checkResponse);
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(checkResponse)
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      } else {
        throw new Error("Token not found in response");
      }
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
