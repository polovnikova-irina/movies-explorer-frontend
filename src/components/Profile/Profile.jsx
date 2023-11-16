import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { Header } from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export function Profile({ loggedIn, onUpdateUser }) {
  const navigate = useNavigate();

  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

// После загрузки текущего пользователя из API его данные 
//будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name || '');
    setEmail(currentUser.email || '');
  }, [currentUser]);

  // Обработчики изменения полей ввода
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      email,
    });
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const signOut = () => {
    localStorage.clear();
    loggedIn(false);
    navigate('/');
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="content">
        <section className="profile">
          <h2 className="profile__title">Привет, {name}!</h2>
          <form className="profile__form"  onSubmit={handleSubmit}>
            <label className="profile__label">
              Имя
              <input
                className="profile__input"
                type="text"
                name="name"
                value={name}
                onChange={handleNameChange}
                required
                placeholder="Имя"
                minLength="2"
                maxLength="30"
                disabled={!isEditing}
              />
            </label>
            <label className="profile__label">
              E-mail
              <input
                className="profile__input"
                placeholder="E-mail"
                type="email"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
                disabled={!isEditing}
              />
            </label>
            {isEditing && (
              <button
                // className={`profile__save-button auth-form__button ${isEditing ? 'profile__save-button_disabled' : ''}`}
                className="profile__save-button auth-form__button"
                type="submit"
                onClick={handleSaveClick}
                // disabled={isEditing}
              >
                Сохранить
              </button>
            )}
          </form>
          {!isEditing && (
            <div className="profile__edit-container">
              <button
                className="profile__button-edit"
                type="button"
                onClick={handleEditClick}
              >
                Редактировать
              </button>
              <button
                className="profile__signout"
                type="button"
                onClick={signOut}
              >
                Выйти из аккаунта
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
