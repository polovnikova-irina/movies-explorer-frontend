import { moviesData } from '../../utils/constants';
import './MoviesCardList.css';
import { MoviesCard } from '../MoviesCard/MoviesCard';

export function MoviesCardList() {
  return (
    <section className="card-list">
        <>
      <ul className="card-list__container">
        {moviesData.map((movie) => (
          <li key={movie._id}>
            <MoviesCard movie={movie} />
          </li>
        ))}
      </ul>
      </>    
      </section>
  );
}
