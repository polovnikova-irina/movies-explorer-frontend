import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useState } from 'react';
import './Header.css';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

export function Header({ loggedIn }) {
  const location = useLocation();
  const mainPage = location.pathname === '/';

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuClick = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const closeMenu = () => {
    setMenuIsOpen(false);
  };

  return (
    <header className={`header ${mainPage ? 'header_theme_blue' : ''}`}>
      {loggedIn ? (
        <div className="header__container">
          <Link to="/">
        <img className="header__logo " src={logo} alt="Лого" />
        </Link>
          <div className="header__menu">
            <Link to="/movies" className="header__link">
              Фильмы
            </Link>
            <Link to="/saved-movies" className="header__link">
              Сохраненные фильмы
            </Link>
            <Link to="/profile" className="header__link menu__footer-link">
              <span className="menu__footer-text">Аккаунт</span>
              <div className="menu__footer-image menu__footer-image_place_header" />
            </Link>
          </div>
           <div className="header__burger">
            <button
              type="button"
              className="header__burger-button"
              aria-label="открыть бургер-меню"
              onClick={handleMenuClick}
            ></button>
            <BurgerMenu isOpen={menuIsOpen} closeMenu={closeMenu} /> 
          </div>
          </div>
      ) : (
        <div className="header__container">
          <Link to="/">
        <img className="header__logo " src={logo} alt="Лого" />
        </Link>
          <div className="header__actions">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
            <button onClick={loggedIn} className="header__login-button">
              Войти
            </button>
          </div>
          </div>
      )}
    </header>
  );
}
