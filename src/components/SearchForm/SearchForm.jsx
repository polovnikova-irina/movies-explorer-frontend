import React, { useState, useEffect } from 'react';

import './SearchForm.css';
import { Toggle } from "../Toggle/Toggle";
import searchFormIcon from '../../images/searchForm__form-icon.svg';


export function SearchForm() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section className="search">
      <div className="search__container">
        <form className="search__form">
        <div className="search__form-wrapper">
          <img className="search__form-icon" src={searchFormIcon} alt="Иконка поиска" />
          <input className="search__form-input" type="text" name="search" placeholder="Фильм" />
          </div>
          <button className="search__form-button" type="submit">Найти</button>
          <div className='search__line'></div>
          {windowWidth >= 768 && (
              <Toggle />
          )}
        </form>
        </div>
        {windowWidth >= 320 && windowWidth <= 767 && (
            <Toggle />
        )}

    </section>
  );
}