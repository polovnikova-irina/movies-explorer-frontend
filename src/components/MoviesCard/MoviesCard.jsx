import './MoviesCard.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MOVIES_API_URL } from "../../utils/constants"
import deleteIcon from '../../images/moviesCard__image-delete.svg';
import saveIcon from '../../images/moviesCard__image-save.svg';

export function MoviesCard({ movie, onToggleSave, onDelete, savedMovies }) {

  const [isSavedMovie, setIsSavedMovie] = useState(false);

  const location = useLocation();
  const savedMoviesPage = location.pathname === '/saved-movies';
  const moviesPage = location.pathname === '/movies';
  const [hovered, setHovered] = useState(false);

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
  }

  const handleDelete = () => {
    onDelete(movie._id)
  }

  const handleSave = () => {
    if (savedMovies.some(item => movie.id === item.movieId)) {
      setIsSavedMovie(false);
      onToggleSave(movie);
    } else {
      setIsSavedMovie(true);
      onToggleSave(movie);
    }
  };

  useEffect(() => {
    if (moviesPage)
    setIsSavedMovie(savedMovies.some(item => movie.id === item.movieId))
  }, [savedMovies, movie.id, setIsSavedMovie, moviesPage])


  return (
    <div className="card" onMouseEnter={handleHover}
    onMouseLeave={handleLeave}>
      <a
        href={movie.trailerLink}
        target="_blank"
        className="card__image-link"
        rel="noreferrer"
      >
        <img className="card__image" src={`${MOVIES_API_URL}${movie.image.url}`} alt={movie.nameRU} />
      </a>
      <div className="card__container">
        <div className="card__wrapper">
          <h2 className="card__title">{movie.nameRU}</h2>
          {moviesPage && (
            <button
              className="card__button card__button_type_save"
              // ${!isSavedMovie
              //   ? "movies-card__btn_type_save" 
              //   : "movies-card__btn_type_saved"}`}
              type="button"
              aria-label="Сохранить"
              onClick={handleSave}
            >
              <img
                className="card__icon card__icon_type_save"
                alt="сохранить"
                src={saveIcon}
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
