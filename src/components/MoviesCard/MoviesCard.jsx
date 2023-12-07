import './MoviesCard.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MOVIES_API_URL } from '../../utils/constants';
import deleteIcon from '../../images/moviesCard__image-delete.svg';
import saveIcon from '../../images/moviesCard__image-save.svg';
import saveIconDisactive from '../../images/moviesCard__image-save-disactive.svg';

export function MoviesCard({ movie, onToggleSave, onDelete, savedMovies }) {
  // const [isSavedMovie, setIsSavedMovie] = useState(false);
  const [hovered, setHovered] = useState(false);

  const location = useLocation();
  const savedMoviesPage = location.pathname === '/saved-movies';
  const moviesPage = location.pathname === '/movies';

  const isSaved =
    savedMovies && savedMovies.some((item) => movie.id === item.movieId);

  const handleSave = () => {
    onToggleSave(movie);
  };

  const handleDelete = () => {
    onDelete(movie._id);
  };

  const handleHover = () => {
    setHovered(true);
  };

  const handleLeave = () => {
    setHovered(false);
  };

  const convertDuration = (totalMinutes) => {
    const minutes = totalMinutes % 60;
    const hours = Math.floor(totalMinutes / 60);
    if (hours < 1) {
      return `${minutes}м`;
    } else {
      return `${hours}ч ${minutes}м`;
    }
  };

  return (
    <div className="card" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
      <a
        href={movie.trailerLink}
        target="_blank"
        className="card__image-link"
        rel="noreferrer"
      >
        <img
          className="card__image"
          src={
            moviesPage
              ? `${MOVIES_API_URL}${movie.image.url}`
              : `${movie.image}`
          }
          alt={movie.nameRU}
        />
      </a>
      <div className="card__container">
        <div className="card__wrapper">
          <h2 className="card__title">{movie.nameRU}</h2>
          {moviesPage && (
            <button
              className="card__button card__button_type_save"
              type="button"
              aria-label="Сохранить"
              onClick={handleSave}
            >
              <img
                className="card__icon card__icon_type_save"
                src={isSaved ? saveIcon : saveIconDisactive}
                alt={isSaved ? 'Сохранено' : 'Сохранить'}
              />
            </button>
          )}
          {savedMoviesPage && (
            <button
              className={`card__button card__button_type_delete ${
                hovered ? '' : 'card__button_visible'
              }`}
              type="button"
              aria-label="Удалить фильм"
              onClick={handleDelete}
            >
              <img
                className="card__icon card__icon_type_delete"
                alt="удалить"
                src={deleteIcon}
              />
            </button>
          )}
        </div>
        <p className="card__duration">{convertDuration(movie.duration)}</p>
      </div>
    </div>
  );
}
