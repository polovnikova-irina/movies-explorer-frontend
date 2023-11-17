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
import { PageNotFound } from '../PageNotFound/PageNotFound.jsx';

function App() {
  const navigate = useNavigate();
  const [currentUser, setСurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   if(loggedIn) {
  //   Promise.all([api.getInfo(localStorage.jwt), api.getCards(localStorage.jwt)])
  //     .then(([dataUser, dataCards]) => {
  //       setСurrentUser(dataUser);
  //       setCards(dataCards);
  //     })
  //     .catch((err) =>
  //       console.log("Ошибка при загрузке данных о пользователе:", err)
  //     );
  //   }
  // }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      mainApi.getUserInfo(localStorage.jwt)
        .then((dataUser) => {
          setСurrentUser(dataUser);
        })
        .catch((err) =>
          console.log("Ошибка при загрузке данных о пользователе:", err)
        );
    }
  }, [loggedIn]);


  const handleUpdateUser = (name, email) => {
    // setIsLoading(true);
    mainApi
      .setUsersData(name, email, localStorage.jwt)
      .then((data) => {
        setСurrentUser(data);
      })
      .catch((err) =>
        console.log("Ошибка при изменении данных о пользователе:", err)
      )
      // .finally(() => setIsLoading(false));
  };

  function handleRegisterSubmit(name, email, password) {
    mainApi 
      .register(name, email, password)
      .then((res) => {
        console.log('Регистрация успешна:', res);
        handleLoginSubmit(email, password);
        // // setIsSuccess(true);
      })
      .catch((err) => {
        console.error('Ошибка при регистрации:', err);
        if (err.status === 400) {
          console.log('400 - некорректно заполнено одно из полей');
        }
        // setIsSuccess(false);
      });
    // .finally(() => setIsInfoTooltipPopupOpen(true));
  }

  function handleLoginSubmit(email, password) {
    mainApi 
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        navigate('/movies', { replace: true });
      })
      .catch((err) => {
        // setIsSuccess(false);
        // setIsInfoTooltipPopupOpen(true);
        if (err.status === 400) {
          console.log('400 - не передано одно из полей');
        } else if (err.status === 401) {
          console.log('401 - пользователь с email не найден');
        }
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Routes>
        <Route path="/" element={<Main loggedIn={loggedIn} />} />
        <Route
          path="/signup"
          element={<Register onRegister={handleRegisterSubmit} />}
        />
        <Route path="/signin" element={<Login onLogin={handleLoginSubmit} />} />
        <Route
          path="/movies"
          element={
            <ProtectedRouteElement element={Movies} loggedIn={loggedIn} />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <ProtectedRouteElement element={SavedMovies} loggedIn={loggedIn} />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRouteElement
              element={Profile}
              loggedIn={loggedIn}
              onUpdateUser={handleUpdateUser}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
