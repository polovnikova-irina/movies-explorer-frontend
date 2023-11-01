import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import image from '../../images/moviesCard__image.jpg';
import deleteIcon from '../../images/moviesCard__image-delete.svg';
import saveIcon from '../../images/moviesCard__image-save.svg';

export function MoviesCard() {
  const location = useLocation();
  return (
    <div className="card">
      <a
        href="https://www.youtube.com/watch?v=5ovzC93EneA"
        target="_blank"
        className="card__image-link"
        rel="noreferrer"
      >
        <img className="card__image" src={image} alt="постер" />
      </a>
      <div className="card__container">
        <div className="card__wrapper">
          <h2 className="card__title">33 слова о дизайне</h2>
          {location.pathname === '/movies' && (
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
          {location.pathname === '/saved-movies' && (
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
        <p className="card__duration">1ч 42м</p>
      </div>
    </div>
  );
}
