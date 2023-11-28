import './SavedMovies.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { searchMovies, filterShortFilms } from '../../utils/utils';

export function SavedMovies({ loggedIn, onDelete, savedMovies }) {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [moviesForRender, setMoviesForRender] = useState([]);
  const [currentInputValue, setCurrentInputValue] = useState('');

  //поиск с фильтрацией фильмов
  const updateAndFilterMoviesData = useCallback(
    (moviesData, searchQuery, isFilterActive) => {
      setCurrentInputValue(searchQuery);
      const searchResult = searchMovies(moviesData, searchQuery);
      setSearchedMovies(searchResult);
      const filteredMovies = filterShortFilms(searchResult, isFilterActive);
      setMoviesForRender(filteredMovies);
    },
    []
  );

  //отправить поисковой запрос
  const handleSubmitSearchRequest = useCallback(
    (query) => {
      setIsFilterActive(false);
      updateAndFilterMoviesData(savedMovies, query, isFilterActive);
    },
    [updateAndFilterMoviesData, savedMovies, isFilterActive]
  );

  //фильтрация фильмов
  const handleOnFilterClick = useCallback(
    (isFilterActive) => {
      let filteredMovies;

      if (!searchedMovies.length && !currentInputValue) {
        filteredMovies = filterShortFilms(savedMovies, isFilterActive);
      } else if (isFilterActive) {
        filteredMovies = filterShortFilms(searchedMovies, isFilterActive);
      } else {
        filteredMovies = searchedMovies;
      }
      setMoviesForRender(filteredMovies);
    },
    [searchedMovies, savedMovies, currentInputValue]
  );

  useEffect(() => {
    setMoviesForRender(savedMovies);
  }, [savedMovies]);


  useEffect(() => {
    if (searchedMovies.length) {
      updateAndFilterMoviesData(savedMovies, currentInputValue, isFilterActive);
    }
  }, [
    searchedMovies.length,
    savedMovies,
    currentInputValue,
    isFilterActive,
    updateAndFilterMoviesData,
  ]);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="content">
        <section className="saved-movies">
          <SearchForm
            onSearch={handleSubmitSearchRequest}
            inputValue={currentInputValue}
            isFilterActive={isFilterActive}
            onFilterChange={handleOnFilterClick}
            savedMovies={savedMovies}
          />
          <MoviesCardList
            movies={moviesForRender}
            onDelete={onDelete}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
