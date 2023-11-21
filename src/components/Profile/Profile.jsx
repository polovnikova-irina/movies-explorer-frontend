import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { Header } from '../Header/Header';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../hooks/validation';

export function Profile({ loggedIn, onUpdateUser }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [prevValues, setPrevValues] = useState({});
  const [notification, setNotification] = useState("");

  const { values, handleChange, errors, isValid, setIsValid, resetForm } =
    useFormWithValidation();

   const currentUser = useContext(CurrentUserContext);

   const handleEditClick = () => {
    setPrevValues(values);
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser({
      name: currentUser.name,
      email: currentUser.email,
    });
  };

  useEffect(() => {
    resetForm({
      name: currentUser.name || '',
      email: currentUser.email || '',
    });
  }, [currentUser, resetForm]);

  useEffect(() => {
    if (isEditing) {
      handleDisableBtn();
    }
  }, [isEditing, values, currentUser]);

  function handleDisableBtn() {
    if (
      values.name === currentUser.name &&
      values.email === currentUser.email
    ) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }

  const handleCancelClick = () => {
    resetForm(prevValues);
    setIsEditing(false);
  };


  function signOut() {
    localStorage.clear();
    loggedIn(false);
    navigate('/');
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='content'>
        <section className='profile'>
          <h2 className='profile__title'>{`Привет, ${values.name}!`}</h2>
          <form className='profile__form' onSubmit={handleSubmit}>
            <label className='profile__label'>
              Имя
              <input
                className='profile__input'
                type='text'
                name='name'
                value={values.name || ''}
                onChange={handleChange}
                required
                placeholder='Имя'
                minLength='2'
                maxLength='30'
                disabled={!isEditing}
              />
            </label>
            {/* <span className='profile__input-error input-error'>
            {errors.name}
            </span> */}
            <label className='profile__label'>
              E-mail
              <input
                className='profile__input'
                placeholder='E-mail'
                type='email'
                name='email'
                value={values.email}
                onChange={handleChange}
                required
                disabled={!isEditing}
              />
            </label>
            {/* <span className='profile__input-error input-error'>
            {errors.email || 'Некорректный email'}
            </span> */}
            {isEditing && (
              <>
                <button
                  className={`profile__save-button auth-form__button ${
                    !isValid ? 'profile__save-button_disabled' : ''
                  }`}
                  type='submit'
                  onClick={handleSaveClick}
                  disabled={!isValid}
                >
                  Сохранить
                </button>
                <button
                  className='profile__button-cancel'
                  type='button'
                  onClick={handleCancelClick}
                >
                  Отменить
                </button>
              </>
            )}
          </form>
          {!isEditing && (
                       
            <div className='profile__edit-container'>
              <button
                className='profile__button-edit'
                type='button'
                onClick={handleEditClick}
              >
                Редактировать
              </button>
              <button
                className='profile__signout'
                type='button'
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
