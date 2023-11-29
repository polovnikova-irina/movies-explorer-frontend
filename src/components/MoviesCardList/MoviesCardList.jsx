import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';
import { useLocation } from 'react-router-dom';

export function MoviesCardList({
  movies,
  onDelete,
  isLoading,
  onToggleSave,
  savedMovies,
}) {
  const { pathname } = useLocation();
  const moviesPage = pathname === "/movies";
  const savedMoviesPage = pathname === "/saved-movies";

  return (
    <section className="card-list">
      {movies.length !== 0 && (
        <ul className="card-list__container">
          {movies.map((movie) => (
            <li key={(moviesPage && movie.id) || (savedMoviesPage && movie._id)}>
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
