import '../../vendor/fonts/fonts.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
import { AUTH_ERRORS } from '../../utils/constants.js';


function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const [isTokenValid, setTokenValidity] = useState(true); //при обновлении оставалась нужная страница
  const [isSuccess, setIsSuccess] = useState(false); //уведомление об успехе
  const [loggedIn, setLoggedIn] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);  //редактируется ли профиль
  const [updateErrorMessage, setUpdateErrorMessage] = useState(''); //сообщение об ошибке
  const [showUpdateError, setShowUpdateError] = useState(false); //отображение ошибки
  const [isPageEntranceNew, setIsPageEntranceNew] = useState(false); 



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
        });
    }
  }, [loggedIn]);

//для обработки ошибок на странице регистрации
function getRegisterErrorMessage(err) {
  if (err.status === 409) {
    return AUTH_ERRORS.CONFLICT.REGISTER;
  } else if (err.status === 400) {
    return AUTH_ERRORS.BAD_REQUEST.REGISTER;
  } else {
    return AUTH_ERRORS.BAD_REQUEST.COMMON;
  }
}

//для обработки ошибок на странице входа
function getSignInErrorMessage(err) {
  if (err.status === 401) {
    return AUTH_ERRORS.UNAUTHORIZED.AUTH;
  } else {
    return AUTH_ERRORS.BAD_REQUEST.COMMON;
  }
}

//для обработки ошибок на странице профиля
function getProfileErrorMessage(err) {
  if (err.statusCode === 409) {
    return AUTH_ERRORS.CONFLICT.CHANGE_USER;
  } else if (err.statusCode === 400) {
    return AUTH_ERRORS.BAD_REQUEST.CHANGE_USER;
  } else if (err.statusCode === 401) {
    return AUTH_ERRORS.UNAUTHORIZED.IDENTIFICATION;
  } else {
    return AUTH_ERRORS.BAD_REQUEST.COMMON;
  }
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

        const timeoutDuration = 3000;
        setTimeout(() => {
          setShowUpdateError(false);
        }, timeoutDuration);
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
        if (err.status === 400) {
          console.log('400 - некорректно заполнено одно из полей');
        }
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
        if (err.status === 400) {
          console.log('400 - не передано одно из полей');
        } else if (err.status === 401) {
          console.log('401 - пользователь с email не найден');
        }
        console.log(err);
        setIsSuccess(true);
      })
      .finally(() => setIsLoading(false));
  }

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
    console.log('movie.id:', movie.id)
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
      <div className="page">
        {isTokenValid ? (
          <Preloader />
        ) : (
          <Routes>
            <Route path="/" element={<Main loggedIn={loggedIn} />} />
            <Route
              path="/signup"
              element={
                <Register
                  onRegister={handleRegisterSubmit}
                  isSuccess={isSuccess}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  onLogin={handleLoginSubmit}
                  isSuccess={isSuccess}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/movies"
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
              path="/saved-movies"
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
              path="/profile"
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
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        )}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
