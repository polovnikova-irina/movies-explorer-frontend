import {MAIN_API_URL, MOVIES_API_URL} from "../utils/constants"

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`${res.status}`);
  }

  _request(endpoint, options) {
    const url = `${this._baseUrl}${endpoint}`;
    return fetch(url, options).then(this._checkResponse);
  }

 register = (name, email, password) => {
    return this._request('/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password}),
    });
  };
  
 authorize = (email, password) => {
    return this._request('/signin', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          return data;
        } else {
          throw new Error("Token not found in response");
        }
      });
  };
  
  getUserInfo(token) {
    return this._request('/users/me', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  setUsersData(name, email, token) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email }),
    });
  }

  getSavedMovies(token) {
    return this._request('/movies', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  saveMovie(movie, token) {
    console.log('Saving movie with id:', movie.id);
    return this._request('/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        description: movie.description,
        year: movie.year,
        image: `${MOVIES_API_URL}${movie.image.url}`,
        trailerLink: movie.trailerLink,
        thumbnail: `${MOVIES_API_URL}${movie.image.formats.thumbnail.url}`,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    });
  }


  deleteMovie(movieId, token) {
    return this._request(`/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
}

export const mainApi = new Api({
  baseUrl: MAIN_API_URL,
});
