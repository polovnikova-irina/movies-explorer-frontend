import React, { useState } from 'react';
import './AuthForm.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export function AuthForm({
  title,
  isRegistration,
  nameInputLabel,
  emailInputLabel,
  passwordInputLabel,
  buttonLabel,
  onSubmit,
  text,
  to,
  textLink,
}) {
  const [isButtonDisabled, setButtonDisabled] = useState(true); 

  const handleInputChange = (event) => {
    if (event.target.value !== '') {
      setButtonDisabled(false); 
    } else {
      setButtonDisabled(true); 
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  // };

  return (
    <div className='auth-form'>
    <div className='auth-form__header'>
      <Link to='/'>
        <img className='auth-form__logo' src={logo} alt='Лого' />
      </Link>
      <h1 className='auth-form__title'>{title}</h1>
    </div>
    <div>
    <form className='auth-form__form' onSubmit={onSubmit}>
      {isRegistration && (
        <label className='auth-form__label'>
          {nameInputLabel}
          <input
            className='auth-form__input'
            type='text'
            name='name'
            minLength="2"
            maxLength="30"
            required
            onChange={handleInputChange} 
            placeholder='Имя'
          />
        </label>
      )}
  
      <label className='auth-form__label'>
        {emailInputLabel}
        <input
          className='auth-form__input'
          type='email'
          name='email'
          required
          onChange={handleInputChange}
          placeholder='E-mail' 
        />
      </label>
      <label className='auth-form__label'>
        {passwordInputLabel}
        <input
          className='auth-form__input'
          type='password'
          name='password'
          minLength="2"
          maxLength="30"
          required
          onChange={handleInputChange} 
          placeholder='Пароль'
        />
      </label>
      <button className={`auth-form__button ${isRegistration ? 'auth-form__button_type_registration-form' : 'auth-form__button_type_login-form'}`} type='submit' disabled={isButtonDisabled}>
        {buttonLabel}
      </button>
    </form>
    </div>
    <div className={`auth-form__navigation ${isRegistration ? 'auth-form__navigation_type_registration-form' : 'auth-form__navigation_type_login-form'}`}>
      <p className='auth-form__navigation-text'>{text}</p>
      <Link to={to} className='auth-form__navigation-link'>
        {textLink}
      </Link>
    </div>
  </div>
  );
}
