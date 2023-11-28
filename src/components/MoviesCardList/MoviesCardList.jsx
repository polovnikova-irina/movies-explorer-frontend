import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';

export function MoviesCardList({ movies, onDelete, firstSavedEntrance, isLoading, onChangeSave, savedMovies }) {
  console.log('Movies in MoviesCardList:', movies);

  return (
    <section className="card-list">
      {movies.length !== 0 && (
      <ul className="card-list__container">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MoviesCard movie={movie} />
          </li>
        ))}
      </ul>
      )}  
      </section>
  );
}
