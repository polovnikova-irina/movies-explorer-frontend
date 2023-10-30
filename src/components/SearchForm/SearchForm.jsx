import React, { useState } from 'react';
import './SearchForm.css';
import toggleIconOn from '../../images/searchForm__switch-on.svg';
import toggleIconOff from '../../images/searchForm__switch-off.svg';
import searchFormIcon from '../../images/searchForm__form-icon.svg';



export function SearchForm() {
  const [isToggled, setIsToggled] = useState(false);
  const toggleSwitch = () => {
    setIsToggled(!isToggled);
  };

  return (
    <section className="search">
    <div className="search__container">
    <form className="search__form">
      <img className="search__form-icon" src={searchFormIcon} alt="картинка поиска" />
      <input className="search__form-input" type="text" name="search" placeholder="Фильм" />
      <button className="search__form-button" type="submit">Найти</button>
      <hr class="search__form-divider" />
    </form>
    </div>
    <div className="search__toggle-container">
    <label className="search__toggle">
      <input className="search__toggle-checkbox" type="checkbox" checked={isToggled} onChange={toggleSwitch} />
      <div className="search__toggle-image">
        <img className={`search__toggle-icon ${isToggled ? 'search__toggle-icon_on' : 'search__toggle-icon_off'}`} src={isToggled ? toggleIconOn : toggleIconOff} alt={isToggled ? 'Включить' : 'Выключить'} />
      </div>
    </label>
    <p className="search__toggle-shortfilms">Короткометражки</p>
  </div>
  </section>
  );
}
