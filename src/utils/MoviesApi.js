import {MOVIES_API_URL} from "../utils/constants"

class MoviesApi {
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
      console.log('Запрос к бд:', this._baseUrl + '/beatfilm-movies');
        return this._request('/beatfilm-movies', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
      };
}

export const moviesApi = new MoviesApi({
    baseUrl: MOVIES_API_URL,
  });
