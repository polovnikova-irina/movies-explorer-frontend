import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { Header } from '../Header/Header';

export function Profile(loggedIn) {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const signOut = () => {
    // localStorage.clear();
    // loggedIn(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <Header />
      <main className="content">
        <section className="profile">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form className="profile__form">
            <label className="profile__label">
              <p className="profile__input-text">Имя</p>
              <input
                className="profile__input"
                type="name"
                name="name"
                // value={name}
                required
                disabled={!isEditing}
              />
            </label>
            <hr className="profile__divider" />
            <label className="profile__label">
              <p className="profile__input-text">E-mail</p>
              <input
                className="profile__input"
                type="email"
                name="email"
                // value={email}
                required
                disabled={!isEditing}
              />
            </label>
          </form>
          <div className="profile__nav">
            {isEditing ? (
              <button
                className="profile__nav-edit"
                type="button"
                onClick={handleSaveClick}
              >
                Сохранить
              </button>
            ) : (
              <button
                className="profile__nav-edit"
                type="button"
                onClick={handleEditClick}
              >
                Редактировать
              </button>
            )}
            <button
              className="profile__nav-signout"
              type="button"
              onClick={signOut}
            >
              Выйти из аккаунта
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
