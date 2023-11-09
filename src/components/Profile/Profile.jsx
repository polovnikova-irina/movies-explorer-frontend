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
    navigate("/");
    window.location.reload();
  }

  return (
    <>
    <Header />
    <section className='profile'>
      <h2 className='profile__title'>Привет, Виталий!</h2>
      <form className='profile__form'>
        <label className='profile__label'> 
        <p className='profile__input-text'>Имя</p>
          <input
            className='profile__input'
            type='name'
            name='name'
            // value={name}
            required
            disabled={!isEditing}
          />
        </label>
        <hr className='profile__divider'/>
        <label className='profile__label'>
        <p className='profile__input-text'>E-mail</p>
          <input
            className='profile__input'
            type='email'
            name='email'
            // value={email}
            required
            disabled={!isEditing}
          />
        </label>
      </form>
        <div className='profile__nav'>
        {isEditing ? (
          <button className='profile__nav-edit' onClick={handleSaveClick}>
            Сохранить
          </button>
        ) : (
          <button className='profile__nav-edit' onClick={handleEditClick}>
            Редактировать
          </button>
        )}
        <button className='profile__nav-signout' onClick={signOut}>Выйти из аккаунта</button>
      </div>
    </section>
    </>
  );
}
