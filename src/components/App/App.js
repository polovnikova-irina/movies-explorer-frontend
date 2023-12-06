import '../../vendor/fonts/fonts.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { ProtectedRouteElement } from '../ProtectedRoute/ProtectedRoute.jsx';
import { mainApi } from '../../utils/MainApi.js';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies.jsx';
import { Register } from '../Register/Register.jsx';
import { Login } from '../Login/Login.jsx';
import { Profile } from '../Profile/Profile.jsx';
import { Preloader } from '../Preloader/Preloader.jsx';
import { PageNotFound } from '../PageNotFound/PageNotFound.jsx';
import {
  getProfileErrorMessage,
  getRegisterErrorMessage,
  getSignInErrorMessage,
} from '../../utils/errorHandlers.js';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTokenValid, setTokenValidity] = useState(true); 
  const [isSuccess, setIsSuccess] = useState(false); 
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false); 
  const [updateErrorMessage, setUpdateErrorMessage] = useState(''); 
  const [showUpdateError, setShowUpdateError] = useState(false); 
  const [isPageEntranceNew, setIsPageEntranceNew] = useState(false);

  const profilePage = location.pathname === '/profile';

  useEffect(() => {
    if (localStorage.jwt) {
      Promise.all([
        mainApi.getUserInfo(localStorage.jwt),
        mainApi.getSavedMovies(localStorage.jwt),
      ])
        .then(([dataUser, dataMovies]) => {
          setCurrentUser(dataUser);
          setSavedMovies(dataMovies);
          setLoggedIn(true);
          setTokenValidity(false);
        })
        .catch((err) => {
          console.log('Ошибка при загрузке данных о пользователе:', err);
          setTokenValidity(false);
          localStorage.clear();
        })
    } else {
      setLoggedIn(false);
      setTokenValidity(false);
      localStorage.clear();
    }
  }, [loggedIn]);

  function handleRegisterSubmit(name, email, password) {
    setIsLoading(true);
    mainApi
      .register(name, email, password)
      .then((res) => {
        handleLoginSubmit(email, password);
        setIsSuccess(false);
      })
      .catch((err) => {
        console.error('Ошибка при регистрации:', err);
        setUpdateErrorMessage(getRegisterErrorMessage(err));
        setShowUpdateError(true);
        setIsSuccess(true);
      })
      .finally(() => setIsLoading(false));
  }

  function handleLoginSubmit(email, password) {
    setIsLoading(true);
    mainApi
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        navigate('/movies', { replace: true });
        setIsSuccess(false);
      })
      .catch((err) => {
        console.log(err);
        setUpdateErrorMessage(getSignInErrorMessage(err));
        setShowUpdateError(true);
        setIsSuccess(true);
      })
      .finally(() => setIsLoading(false));
  }

  const handleUpdateUser = (name, email) => {
    setIsLoading(true);
    mainApi
      .setUsersData(name, email, localStorage.jwt)
      .then((data) => {
        setIsEditingProfile(false);
        setCurrentUser(data);
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log('Ошибка при изменении данных о пользователе:', err);
        setIsSuccess(false);
        setUpdateErrorMessage(getProfileErrorMessage(err));
        setShowUpdateError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleClickEditProfile() {
    setIsPageEntranceNew(false);
    setIsEditingProfile(true);
    setIsSuccess(false);
  }

  useEffect(() => {
    setIsPageEntranceNew(false);
    setIsEditingProfile(false);
  }, [profilePage]);

 // Запуск таймера для setIsSuccess
  useEffect(() => {
    if (isSuccess) {
      const successTimeout = setTimeout(() => {
        setIsSuccess(false);
      }, 3000);

      return () => clearTimeout(successTimeout);
    }
  }, [isSuccess]);

  // Запуск таймера для showUpdateError
  useEffect(() => {
    if (showUpdateError) {
      const errorTimeout = setTimeout(() => {
        setShowUpdateError(false);
      }, 3000);

      return () => clearTimeout(errorTimeout);
    }
  }, [showUpdateError]);

  function handleDeleteMovie(savedMovieId) {
    mainApi
      .deleteMovie(savedMovieId, localStorage.jwt)
      .then(() => {
        setSavedMovies(
          savedMovies.filter((movie) => {
            return movie._id !== savedMovieId;
          })
        );
      })
      .catch((err) => {
        console.log('Ошибка при удалении фильма:', err);
      });
  }

  function handleToggleMovieSave(movie) {
    console.log('movie.id:', movie.id);
    const isSaved = savedMovies.some((item) => movie.id === item.movieId);

    if (!isSaved) {
      mainApi
        .saveMovie(movie, localStorage.jwt)
        .then((res) => {
          setSavedMovies((prevSavedMovies) => [res, ...prevSavedMovies]);
        })
        .catch((err) => {
          console.log('Ошибка при сохранении фильма:', err);
        });
    } else {
      const matchingMovies = savedMovies.filter((element) => {
        return element.movieId === movie.id;
      });
      handleDeleteMovie(matchingMovies[0]._id);
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        {isTokenValid ? (
          <Preloader />
        ) : (
          <Routes>
            <Route path='/' element={<Main loggedIn={loggedIn} />} />
            <Route
              path='/signup'
              element={
                <Register
                  onRegister={handleRegisterSubmit}
                  isSuccess={isSuccess}
                  isLoading={isLoading}
                  updateErrorMessage={updateErrorMessage}
                  showUpdateError={showUpdateError}
                />
              }
            />
            <Route
              path='/signin'
              element={
                <Login
                  onLogin={handleLoginSubmit}
                  isSuccess={isSuccess}
                  isLoading={isLoading}
                  updateErrorMessage={updateErrorMessage}
                  showUpdateError={showUpdateError}
                />
              }
            />
            <Route
              path='/movies'
              element={
                <ProtectedRouteElement
                  element={Movies}
                  loggedIn={loggedIn}
                  onToggleSave={handleToggleMovieSave}
                  onDelete={handleDeleteMovie}
                  savedMovies={savedMovies}
                />
              }
            />
            <Route
              path='/saved-movies'
              element={
                <ProtectedRouteElement
                  element={SavedMovies}
                  loggedIn={loggedIn}
                  onDelete={handleDeleteMovie}
                  savedMovies={savedMovies}
                />
              }
            />
            <Route
              path='/profile'
              element={
                <ProtectedRouteElement
                  element={Profile}
                  loggedIn={setLoggedIn}
                  onUpdateUser={handleUpdateUser}
                  onEditProfile={handleClickEditProfile}
                  isSuccess={isSuccess}
                  isLoading={isLoading}
                  isEditingProfile={isEditingProfile}
                  updateErrorMessage={updateErrorMessage}
                  showUpdateError={showUpdateError}
                  isPageEntranceNew={isPageEntranceNew}
                />
              }
            />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
