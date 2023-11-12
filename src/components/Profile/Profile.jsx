import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { Header } from '../Header/Header';

export function Profile(loggedIn) {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const signOut = () => {
    localStorage.clear();
    // loggedIn(false);
    navigate('/');
  };

  return (
    <>
      <Header />
      <main className="content">
        <section className="profile">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form className="profile__form">
            <label className="profile__label">
              Имя
              <input
                className="profile__input"
                type="name"
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
              <div className='profile__edit-container'>
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
