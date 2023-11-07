import './BurgerMenu.css';
import { Link } from 'react-router-dom';
import account from '../../images/header-account.svg'
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
            <Link to="/" className="header__link">
              Главная
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/movies" className="header__link">
              Фильмы
            </Link>
          </li>
          <li className="menu__item">
            <Link to="/saved-movies" className="header__link">
              Сохранённые фильмы
            </Link>
          </li>
        </ul>
      </nav>
      <nav className='menu__footer'>
            <div className="menu__footer-conteiner">
              <Link to="/profile" className="menu__footer-text">Аккаунт</Link>
              <Link to="/profile">
                <img src={account} alt="Логотип аккаунта" className="menu__footer-image" />
              </Link>
            </div>
          </nav>
    </div>
  );
}
