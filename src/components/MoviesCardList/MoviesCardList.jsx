import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';
import { Preloader } from '../Preloader/Preloader';
import { MOVIES_MESSAGES } from '../../utils/constants';

export function MoviesCardList({
  movies,
  onDelete,
  isLoading,
  onToggleSave,
  savedMovies,
}) {
  const { pathname } = useLocation();
  const moviesPage = pathname === '/movies';
  const savedMoviesPage = pathname === '/saved-movies';

  return (
    <section className="card-list">
      {moviesPage && movies.length === 0 && isLoading && <Preloader />}

      {moviesPage &&
        movies.length === 0 &&
        !localStorage.getItem('searchedMovies') &&
        null}

      {moviesPage &&
        movies.length === 0 &&
        !isLoading &&
        localStorage.getItem('searchedMovies') && (
          <p className="card-list__not-found">
            {MOVIES_MESSAGES.NOT_FOUND_ERROR}
          </p>
        )}

      {savedMoviesPage && movies.length === 0 && (
        <p className="movies-card-list__not-found">
          {MOVIES_MESSAGES.NOT_FOUND_ERROR}
        </p>
      )}

      {movies.length !== 0 && (
        <ul className="card-list__container">
          {movies.map((movie) => (
            <li
              key={(moviesPage && movie.id) || (savedMoviesPage && movie._id)}
            >
              <MoviesCard
                movie={movie}
                onToggleSave={onToggleSave}
                savedMovies={savedMovies}
                onDelete={onDelete}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
