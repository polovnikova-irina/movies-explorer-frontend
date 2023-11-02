import './MoviesCard.css';
import poster from '../../images/moviesCard__image.jpg'
import { useLocation } from 'react-router-dom';
import deleteIcon from '../../images/moviesCard__image-delete.svg';
import saveIcon from '../../images/moviesCard__image-save.svg';

export function MoviesCard({ movie }) {
  const location = useLocation();
  const savedMovies = location.pathname === '/saved-movies';
  const movies = location.pathname === '/movies';

  return (
    <div className="card">
      <a
        href={movie.link}
        target="_blank"
        className="card__image-link"
        rel="noreferrer"
      >
        <img className="card__image" src={poster} alt={movie.title} />
      </a>
      <div className="card__container">
        <div className="card__wrapper">
          <h2 className="card__title">{movie.title}</h2>
          {movies && (
            <button
              className="card__button card__button_type_save"
              type="button"
              aria-label="Сохранить"
            >
              <img
                className="card__icon card__icon_type_save"
                alt="удалить"
                src={saveIcon}
              />
            </button>
          )}
          {savedMovies && (
            <button
              className="card__button card__button_type_delete"
              type="button"
              aria-label="Удалить фильм"
            >
              <img
                className="card__icon card__icon_type_delete"
                alt="сохранить"
                src={deleteIcon}
              />
            </button>
          )}
        </div>
        <hr className="card__divider" />
        <p className="card__duration">{movie.duration}</p>
      </div>
    </div>
  );
}
