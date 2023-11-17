import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { Header } from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/validation';
export function Profile({ loggedIn, onUpdateUser }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true); 
  };
  
  const handleSaveClick = () => {
    setIsEditing(false); 
  };
  
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm
  } = useFormWithValidation();

  const currentUser = useContext(CurrentUserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: currentUser.name,
      email: currentUser.email,
    });
  };

  useEffect(() => {
    // Устанавливаем начальные значения из currentUser
    resetForm({
      name: currentUser.name || '',
      email: currentUser.email || '',
    });
  }, [currentUser, resetForm]);


  function signOut() {
    localStorage.clear();
    loggedIn(false);
    navigate('/');
  };

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="content">
        <section className="profile">
          <h2 className="profile__title">{`Привет, ${values.name}!`}</h2>
          <form className="profile__form"  onSubmit={handleSubmit}>
            <label className="profile__label">
              Имя
              <input
                className="profile__input"
                type="text"
                name="name"
                value={values.name || ''}
                onChange={handleChange}
                required
                placeholder="Имя"
                minLength="2"
                maxLength="30"
                disabled={!isEditing}
              />
            </label>
            <span className='profile__input-error input-error'>{errors.name}</span> 
            <label className="profile__label">
              E-mail
              <input
                className="profile__input"
                placeholder="E-mail"
                type="email"
                name="email"
                value={values.email || ''}
                onChange={handleChange}
                required
                disabled={!isEditing}
              />
            </label>
            <span className='profile__input-error input-error'>{errors.email}</span> 
            {isEditing && (
              <>
              {/* <span>{errors.name}</span> */}
              <button
                className={`profile__save-button auth-form__button ${!isValid ? 'profile__save-button_disabled' : ''}`}
                type="submit"
                onClick={handleSaveClick}
                disabled={!isValid} 
              >
                Сохранить
              </button>
              </>
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
