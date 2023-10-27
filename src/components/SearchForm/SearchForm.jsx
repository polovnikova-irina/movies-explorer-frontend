import React, { useState } from 'react';
import './SearchForm.css';
import switchOn from '../../images/searchForm__switch-on.svg';
import switchOff from '../../images/searchForm__switch-off.svg';

export function SearchForm() {
  const [isToggled, setIsToggled] = useState(false);

  const toggleSwitch = () => {
    setIsToggled(!isToggled);
  };

  return (
    <section className="searchForm">
      <div className="footer__container">
        <p className="searchForm__text">Фильм</p>
        <button type="button"></button>
        <hr className="searchForm__divider" />
      </div>
      <div>
        <label className="switch">
          <input className="switch__checkbox" type="checkbox" checked={isToggled} onChange={toggleSwitch} />
          <div>
          <img className={`switch__image ${isToggled ? 'switch__image-on' : 'switch__image-off'}`} src={isToggled ? switchOn : switchOff} alt={isToggled ? 'On' : 'Off'} />
          </div>
        </label>
        <p>Короткометражки</p>
      </div>
    </section>
  );
}
