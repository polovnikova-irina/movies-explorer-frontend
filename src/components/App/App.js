import '../../vendor/fonts/fonts.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
// import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { ProtectedRouteElement } from '../ProtectedRoute/ProtectedRoute.jsx';
import * as auth from '../../utils/auth.js';
import { Main } from '../Main/Main';
import { Movies } from '../Movies/Movies';
import { SavedMovies } from '../SavedMovies/SavedMovies.jsx';
import { Register } from '../Register/Register.jsx';
import { Login } from '../Login/Login.jsx';
import { Profile } from '../Profile/Profile.jsx';
import { PageNotFound } from '../PageNotFound/PageNotFound.jsx';

function App() {
  const navigate = useNavigate();
  // const [currentUser, setСurrentUser] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          setEmail(res.email);
          setName(res.name);
          setLoggedIn(true);
          navigate("/profile", { replace: true });
        })
        .catch((err) => {
          if (err.status === 400) {
            console.log("400 - Токен не передан или передан не в том формате");
          } else if (err.status === 401) {
            console.log("401 - Переданный токен некорректен");
          }
          console.log(err);
        });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleRegisterSubmit(name, email, password) {
    auth
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
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setLoggedIn(true);
        setEmail(email);
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
    // <CurrentUserContext.Provider value={currentUser}>
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
            <ProtectedRouteElement element={Profile} loggedIn={loggedIn} userEmail={email} userName={name} />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
    // </CurrentUserContext.Provider>
  );
}

export default App;
