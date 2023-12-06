import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { Header } from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/validation';
import {
  SUCCESS_MESSAGE,
  EMAIL_REGEX,
  NAME_REGEX,
} from '../../utils/constants';

export function Profile({
  loggedIn,
  onUpdateUser,
  onEditProfile,
  isSuccess,
  isLoading,
  isEditingProfile,
  isPageEntranceNew,
  updateErrorMessage,
  showUpdateError,
}) {
  const navigate = useNavigate();

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setButtonDisabled(
      currentUser.name === values.name && currentUser.email === values.email
    );
  }, [currentUser, values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values.name, values.email);
  };

  useEffect(() => {
    resetForm({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser, resetForm, isEditingProfile]);

  function signOut() {
    localStorage.clear();
    loggedIn(false);
    navigate('/');
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className="content">
        <section className="profile">
          <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
          <form
            className="profile__form"
            onSubmit={handleSubmit}
            disabled={!isValid}
          >
            <label className="profile__label">
              Имя
              <input
                className="profile__input"
                type="text"
                name="name"
                value={values.name || ''}
                onChange={handleChange}
                required
                pattern={NAME_REGEX}
                placeholder="Введите имя"
                minLength="2"
                maxLength="30"
                disabled={!isEditingProfile}
              />
            </label>
            <span className="profile__input-error">{errors.name}</span>
            <label className="profile__label">
              E-mail
              <input
                className="profile__input"
                placeholder="Введите e-mail"
                type="email"
                name="email"
                pattern={EMAIL_REGEX}
                value={values.email || ''}
                onChange={handleChange}
                required
                disabled={!isEditingProfile}
              />
            </label>
            <span className="profile__input-error">{errors.email}</span>
              <span className="profile__success">
                {isSuccess ? `${SUCCESS_MESSAGE}` : ''}
              </span>
              <div className='profile__wrapper'>
                <span className="profile__error">
                  {showUpdateError ? updateErrorMessage : ''}
                </span>
                {isEditingProfile && !isPageEntranceNew && (
                  <button
                    className={`profile__save-button auth-form__button ${
                      !isValid || isLoading || buttonDisabled 
                        ? 'profile__save-button_disabled'
                        : ''
                    }`}
                    type="submit"
                    disabled={!isValid || isLoading || buttonDisabled}
                  >
                    {!isLoading ? 'Сохранить' : 'Сохранение...'}
                  </button>
                )}
              </div>
          </form>
          {(!isEditingProfile || isPageEntranceNew) && (
            <div className="profile__edit-container">
              <button
                className="profile__button-edit"
                type="button"
                onClick={onEditProfile}
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
