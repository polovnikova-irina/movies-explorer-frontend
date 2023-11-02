import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
// import { useState } from 'react';
import './Header.css';

export function Header({ loggedIn }) {

  const location = useLocation();
  const mainPage = location.pathname === '/';

  return (
       <header className={`header ${mainPage ? 'header_theme_blue' : ""}`}>
      <div className="header__container">
      <img className="header__logo" src={logo} alt="Лого" />
      <div className="header__actions">
      <Link to="/sign-up" className="header__link">
        Регистрация
      </Link>
      <button onClick={loggedIn} className="header__login-button">
        Войти
      </button>
      </div>
    </div>
    </header>
  );
}

  // <div className="header__menu">
  //       <Link to="/movies" className="header__link">
  //         Фильмы
  //       </Link>
  //       <Link to="/saved-movies" className="header__link">
  //         Сохраненные фильмы
  //       </Link>
  //     <Link to="/profile" className="header__link">
  //       Аккаунт
  //     </Link>
  // </div>