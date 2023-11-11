import React, { useState } from 'react';
import './MoviesCard.css';
import poster from '../../images/moviesCard__image.jpg'
import { useLocation } from 'react-router-dom';
import deleteIcon from '../../images/moviesCard__image-delete.svg';
import saveIcon from '../../images/moviesCard__image-save.svg';

export function MoviesCard({ movie }) {
  const location = useLocation();
  const savedMovies = location.pathname === '/saved-movies';
  const movies = location.pathname === '/movies';
  const [hovered, setHovered] = useState(false);

  const handleHover = () => {
    setHovered(true);
  };

  const handleLeave = () => {
    setHovered(false);
  };

  return (
    <div className="card" onMouseEnter={handleHover}
    onMouseLeave={handleLeave}>
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
                alt="сохранить"
                src={saveIcon}
              />
            </button>
          )}
          {savedMovies && (
            <button
            className={`card__button card__button_type_delete ${
              hovered ? '' : 'card__button_visible'
            }`}
              type="button"
              aria-label="Удалить фильм"
            >
              <img
                className="card__icon card__icon_type_delete"
                alt="удалить"
                src={deleteIcon}
              />
            </button>
          )}
        </div>
        <p className="card__duration">{movie.duration}</p>
      </div>
    </div>
  );
}
