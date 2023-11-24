import { SHORT_FILM_DURATION, } from './constants'
// SCREEN_SIZES, INITIAL_COUNT, INCREMENT_VALUES 

// // export function searchMovies(movies, searchQuery) {
// //   const term = searchQuery.toLowerCase().trim();
// //   const matchingMovies = movies.filter((movie) => {
// //     const isMatchRU = movie.titleRU && movie.titleRU.toLowerCase().trim().includes(term);
// //     const isMatchEN = movie.titleEN && movie.titleEN.toLowerCase().trim().includes(term);
// //     return isMatchRU || isMatchEN;
// //   });
// //   return matchingMovies;
// }

export function searchMovies(movies, searchQuery) {
  try {
    const term = searchQuery.toLowerCase().trim();
    const matchingMovies = movies.filter((movie) => {
      const isMatchRU = movie.titleRU.toLowerCase().trim().includes(term);
      const isMatchEN = movie.titleEN.toLowerCase().trim().includes(term);
      return (isMatchRU || isMatchEN);
    });
    return matchingMovies;
  } catch (error) {
    console.error("Error in searchMovies:", error);
    return [];
  }
}

// export function searchMovies(movies, searchQuery) {
//     const term = searchQuery.toLowerCase().trim();
//     const matchingMovies = movies.filter((movie) => {
//       const isMatchRU = movie.titleRU.toLowerCase().trim().includes(term);
//       const isMatchEN = movie.titleEN.toLowerCase().trim().includes(term);
//       return (isMatchRU || isMatchEN);
//     });
//     return matchingMovies;
//   }

export function filterShortFilms(movieList, isFilterActive) {
  if (isFilterActive) {
    const shortFilms = movieList.filter((movie) => movie.duration <= SHORT_FILM_DURATION);
    return shortFilms;
  } else {
    return movieList;
  }
}