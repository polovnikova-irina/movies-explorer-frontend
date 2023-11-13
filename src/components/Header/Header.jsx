import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import { useState } from 'react';
import './Header.css';
import { BurgerMenu } from '../BurgerMenu/BurgerMenu';

export function Header({loggedIn}) {
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
      <nav className="header__container">
        <Link to="/">
          <img className="header__logo" src={logo} alt="Лого" />
        </Link>
        {loggedIn ? (
          <>
            <nav className="header__navigate-movies">
              <Link
                to="/movies"
                className="header__link header__navigate-movies-link"
              >
                Фильмы
              </Link>
              <Link
                to="/saved-movies"
                className="header__link header__navigate-movies-link"
              >
                Сохраненные фильмы
              </Link>
            </nav>
            <Link to="/profile" className="header__link header__link-account">
              <span className="header__link-account-text">Аккаунт</span>
              <div
                className={`header__link-account-image ${
                  mainPage ? 'header__link-account-image_theme_blue' : ''
                }`}
              ></div>
            </Link>
            <nav className="header__burger">
              <button
                type="button"
                className="header__burger-button"
                aria-label="открыть бургер-меню"
                onClick={handleMenuClick}
              ></button>
              <BurgerMenu isOpen={menuIsOpen} closeMenu={closeMenu} />
            </nav>
          </>
        ) : (
          <nav className="header__actions">
            <Link to="/signup" className="header__link">
              Регистрация
            </Link>
            <Link to="/signin" className="header__link header__link-button" >
              Войти
            </Link>
          </nav>
        )} 
      </nav>
    </header>
  );
}
