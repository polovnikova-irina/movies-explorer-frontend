import './Movies.css';
import React, { useState, useEffect } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { SearchForm } from '../SearchForm/SearchForm';
import { MoviesCardList } from '../MoviesCardList/MoviesCardList';
import { useCallback } from 'react';
import { moviesApi } from '../../utils/MoviesApi';
import { searchMovies, filterShortFilms } from '../../utils/utils';

export function Movies({ loggedIn }) {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false);
  const [moviesForRender, setMoviesForRender] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [firstEntrance, setFirstEntrance] = useState(true);

  const updateAndSaveMoviesData = useCallback(
    (moviesData, searchQuery, isFilterActive) => {
      const searchResult = searchMovies(moviesData, searchQuery);
      setSearchedMovies(searchResult);

      const filteredMovies = filterShortFilms(searchResult, isFilterActive);
      setMoviesForRender(filteredMovies);

      localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
      localStorage.setItem('searchQuery', JSON.stringify(searchQuery));
      localStorage.setItem('isFilterActive', JSON.stringify(isFilterActive));
    },
    []
  );

  useEffect(() => {
    setFirstEntrance(!localStorage.getItem("storedMovies"));
  }, []);

  const handleSearchRequest = useCallback(
    (searchQuery) => {
      setFirstEntrance(false);
  
      const storedMoviesData = localStorage.getItem('storedMovies');
  
      if (!storedMoviesData) {
        setLoading(true);
  
        moviesApi
          .getMovies()
          .then((moviesData) => {
            localStorage.setItem('storedMovies', JSON.stringify(moviesData));
            updateAndSaveMoviesData(moviesData, searchQuery, isFilterActive);
          })
          .catch((error) => {
            setServerError(true);
            console.error(`Error fetching movies: ${error}`);
          })
          .finally(() => setLoading(false));
      } else {
        const savedMoviesData = JSON.parse(storedMoviesData);
        updateAndSaveMoviesData(savedMoviesData, searchQuery, isFilterActive);
      }
    },
    [updateAndSaveMoviesData, isFilterActive]
  );

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="content">
        <section className="movies">
          <SearchForm onSearch={handleSearchRequest}/>
          <MoviesCardList movies={moviesForRender}/>
          <button className="movies__button" type="button" aria-label="еще">
            Ещё
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
}
