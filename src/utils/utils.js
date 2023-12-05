import { SHORT_FILM_DURATION, } from './constants'

export function searchMovies(movies, searchQuery) {
  const term = searchQuery.toLowerCase().trim();
  const matchingMovies = movies.filter((movie) => {
    const isMatchRU = movie.nameRU.toLowerCase().trim().includes(term);
    const isMatchEN = movie.nameEN.toLowerCase().trim().includes(term);

    return isMatchRU || isMatchEN;
  });
  return matchingMovies;
}

export function filterShortFilms(movieList, isFilterActive) {
  if (isFilterActive) {
    const shortFilms = movieList.filter((movie) => movie.duration <= SHORT_FILM_DURATION);
    return shortFilms;
  } else {
    return movieList;
  }
}

