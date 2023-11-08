import React, { useState } from 'react';
import './Profile.css';
import { Header } from '../Header/Header';

export function Profile() {
  //   const [isButtonDisabled, setButtonDisabled] = useState(true);

  //   const handleInputChange = (event) => {
  //     if (event.target.value !== '') {
  //       setButtonDisabled(false);
  //     } else {
  //       setButtonDisabled(true);
  //     }
  //   };

  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //   };

  return (
    <>
    <Header />
    <section className='profile'>
      <h2 className='profile__title'>Привет, Виталий!</h2>
      <form className='aprofile__form'>
        <label className='profile__label'>
          <input
            className='profile__input'
            type='email'
            name='email'
            placeholder='Имя'
            required
          />
        </label>
        <hr className='profile__divider'/>
        <label className='profile__label'>
          <input
            className='profile__input'
            type='email'
            name='email'
            placeholder='E-mail'
            required
          />
        </label>
      </form>
      {/* <button className='profile__button auth-form__button' type='submit' >
          Сохранить
        </button> */}
        <div className='aprofile__navigation'>
        <p className='profile__navigation-edit'>Редактировать</p>
        <p className='profile__navigation-logout'>Выйти из аккаунта</p>
      </div>
    </section>
    </>
  );
}
