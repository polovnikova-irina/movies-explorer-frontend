import './Movies.css';
import React, { useState, useEffect } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { useCallback } from 'react';
import { moviesApi } from '../../utils/MoviesApi';
import { searchMovies, filterShortFilms } from '../../utils/utils';
import { SCREEN_SIZES, INITIAL_COUNT, INCREMENT_VALUES } from '../../utils/constants.js';

export function Movies({ loggedIn, onToggleSave, onDelete, savedMovies }) {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [moviesForRender, setMoviesForRender] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [firstEntrance, setFirstEntrance] = useState(true);
  const [currentValue, setCurrentValue] = useState('');
  const [count, setCount] = useState(INITIAL_COUNT.L_SCREEN);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState(true);

  const moviesToShow = moviesForRender.slice(0, count);

  const updateAndSaveMoviesData = useCallback(
    (moviesData, searchQuery, isFilterActive) => {
      console.log('Movies before search:', moviesData);
      const searchResult = searchMovies(moviesData, searchQuery);
      setSearchedMovies(searchResult);

      const filteredMovies = filterShortFilms(searchResult, isFilterActive);

      setMoviesForRender(filteredMovies);

      localStorage.setItem('movies', JSON.stringify(filteredMovies)); //короткометражки
      localStorage.setItem('searchedMovies', JSON.stringify(searchQuery)); //запрос фильмов по поиску
      localStorage.setItem('shorts', JSON.stringify(isFilterActive)); //состояние фильтра
    },
    []
  );

  const handleSearchRequest = useCallback(
    (query) => {
      setFirstEntrance(false);

      const storedMoviesData = localStorage.getItem('allMovies');

      if (!storedMoviesData) {
        setLoading(true);

        moviesApi
          .getMovies()
          .then((moviesData) => {
            localStorage.setItem('allMovies', JSON.stringify(moviesData));
            updateAndSaveMoviesData(moviesData, query, isFilterActive);
          })
          .catch((error) => {
            setServerError(true);
            console.error(`Ошибка при получении фильмов: ${error}`);
          })
          .finally(() => setLoading(false));
      } else {
        const savedMoviesData = JSON.parse(storedMoviesData);
        updateAndSaveMoviesData(savedMoviesData, query, isFilterActive);
      }
    },
    [updateAndSaveMoviesData, isFilterActive]
  );

  const handleFilterClick = useCallback(
    (isFilterActive) => {
      if (!firstEntrance) {
        setIsFilterActive(isFilterActive);
        const searchQuery = JSON.parse(localStorage.getItem('searchedMovies'));
        const allMovies = JSON.parse(localStorage.getItem('allMovies'));
        const search = searchMovies(allMovies, searchQuery);
        setSearchedMovies(search);

        if (localStorage.getItem('searchedMovies')) {
          if (isFilterActive) {
            const filtered = filterShortFilms(searchedMovies, isFilterActive);
            setMoviesForRender(filtered);

            localStorage.setItem('movies', JSON.stringify(filtered));
            localStorage.setItem('shorts', JSON.stringify(isFilterActive));
          } else {
            setMoviesForRender(search);
            localStorage.setItem('movies', JSON.stringify(search));
            localStorage.setItem('shorts', JSON.stringify(isFilterActive));
          }
        }
      } else {
        setIsFilterActive(isFilterActive);
      }
    },
    [searchMovies, firstEntrance]
  );

  useEffect(() => {
    setFirstEntrance(!localStorage.getItem('storedMovies'));
  }, []);

  useEffect(() => {
    const storedMovies = localStorage.getItem('movies');
    const storedSearchedMovies = localStorage.getItem('searchedMovies');
    const storedShorts = localStorage.getItem('shorts');

    if (storedMovies && storedSearchedMovies && storedShorts) {
      const parsedMovies = JSON.parse(storedMovies);
      const parsedSearch = JSON.parse(storedSearchedMovies);
      const parsedShorts = JSON.parse(storedShorts);

      setCurrentValue(parsedSearch);
      setMoviesForRender(parsedMovies);
      setIsFilterActive(parsedShorts);
    }
  }, []);

    const handleLoadMore = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= SCREEN_SIZES.L) {
      setCount(prevCount => prevCount + INCREMENT_VALUES.L_SCREEN);
    } else if (screenWidth >= SCREEN_SIZES.M) {
      setCount(prevCount => prevCount + INCREMENT_VALUES.M_SCREEN);
    } else {
      setCount(prevCount => prevCount + INCREMENT_VALUES.S_SCREEN);
    }
  };

  useEffect(() => {
    let timeout;

    const handleResize = () => {
      clearTimeout(timeout);
    timeout = setTimeout(() => handleLoadMore(), 200)
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[]);

  useEffect(() => {
    const screenWidth = window.innerWidth;
    const areMoreCardsToShow = count < moviesForRender.length; 
  
    setShowLoadMoreButton(screenWidth >= SCREEN_SIZES.L && areMoreCardsToShow);
  }, [count, moviesForRender]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="content">
        <section className="movies">
          <SearchForm
            onSearch={handleSearchRequest}
            onFilterChange={handleFilterClick}
            isFilterActive={isFilterActive}
            inputValue={currentValue}
            isLoading={isLoading}
            serverError={serverError}
          />
          <MoviesCardList
            movies={moviesToShow}
            isLoading={isLoading}
            onToggleSave={onToggleSave}
            onDelete={onDelete}
            savedMovies={savedMovies}
          />
          {showLoadMoreButton && (
          <button className="movies__button" type="button" aria-label="еще" onClick={handleLoadMore}>
            Ещё
          </button>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
