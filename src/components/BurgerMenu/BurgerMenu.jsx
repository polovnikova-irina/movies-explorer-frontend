import './BurgerMenu.css';
import { Link } from 'react-router-dom';
import buttonClose from '../../images/burgerMenu__close-button.svg'

export function BurgerMenu({ isOpen, closeMenu }) {

  return (
    <div className={`menu ${isOpen ? 'menu_active' : ''}`}>
      <button className="menu__close-button" type='button' onClick={closeMenu}>
            <img src={buttonClose} alt="закрыть" />
      </button>
      <nav className="menu__content">
        <ul className="menu__list">
          <li className="menu__item">
            <Link to="/" className="menu__item-link">
              Главная
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/movies" className="menu__item-link">
              Фильмы
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/saved-movies" className="menu__item-link">
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
      </nav>
      <nav className='menu__footer'>
              <Link to="/profile" className="menu__footer-link">
                <span className="menu__footer-text">Аккаунт</span>
                <div className="menu__footer-image" />
                </Link>
          </nav>
    </div>
  );
}
