import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';

export function MoviesCardList({ movies }) {
  return (
    <section className="card-list">
        <>
      <ul className="card-list__container">
        {movies.map((movie) => (
          <li key={movie.id}>
            <MoviesCard movie={movie} />
          </li>
        ))}
      </ul>
      </>    
      </section>
  );
}
