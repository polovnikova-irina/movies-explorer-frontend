import React, { useState, useEffect } from 'react';
import './SearchForm.css';
import { MOVIES_MESSAGES } from '../../utils/constants';
import { Toggle } from '../Toggle/Toggle';
import searchFormIcon from '../../images/searchForm__form-icon.svg';

export function SearchForm({
  onSearch,
  inputValue,
  isFilterActive,
  onFilterChange,
  isLoading,
  serverError,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentValue, setCurrentValue] = useState('');
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setCurrentValue(inputValue);
    setSearchError('');
    console.log('Занчение инпута обновилось:', inputValue);
  }, [inputValue]);

  function handleSubmit(e) {
    e.preventDefault();
    console.log('Submitting со значением инпута:', currentValue);
    if (currentValue.length !== 0) {
      onSearch(currentValue);
      setSearchError('');
    } else {
      setSearchError(MOVIES_MESSAGES.SEARCH_QUERY_ERROR);
    }
  }

  const handleInputChange = (e) => {
    setCurrentValue(e.target.value);
    console.log('Input Value Changed:', e.target.value);;
  };

  return (
    <section className="search">
      <div className="search__container">
        <form
          className="search__form"
          name="search-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="search__form-wrapper">
            <img
              className="search__form-icon"
              src={searchFormIcon}
              alt="Иконка поиска"
            />
            <input
              className="search__form-input"
              type="text"
              name="search"
              placeholder="Фильм"
              required
              value={currentValue || ''}
              onChange={handleInputChange}
              disabled={isLoading ? true : false}
            />
          </div>
          <button
            className={`search__form-button ${isLoading ? "search__form-button_disable" : ""}`}
            type="submit"
            disabled={isLoading ? true : false}
          >
            Найти
          </button>
          <div className="search__line"></div>
          {windowWidth >= 768 && <Toggle />}
        </form>
      </div>
      {serverError ? (
       <span className="search__error search__error_active">
       {MOVIES_MESSAGES.SERVER_REQUEST_ERROR}
     </span>
      ) : (
        <span className="search__error search__error_active">
          {searchError}
        </span>
      )}
      {windowWidth >= 320 && windowWidth <= 767 && <Toggle />}
    </section>
  );
}
