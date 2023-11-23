import {MOVIES_API_URL} from "../utils/constants"

class Api {
    constructor(options) {
      this._baseUrl = options.baseUrl;
    }
  
    _checkResponse(res) {
      return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }
  
    _request(endpoint, options) {
      const url = `${this._baseUrl}${endpoint}`;
      return fetch(url, options).then(this._checkResponse);
    }

    getMovies=() => {
        return this._request('/beatfilm-movies', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      };
}

export const moviesApi = new Api({
    baseUrl: MOVIES_API_URL,
  });
