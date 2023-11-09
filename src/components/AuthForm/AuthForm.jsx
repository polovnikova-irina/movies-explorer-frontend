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
          <img className='auth-form__logo header__logo' src={logo} alt='Лого' />
        </Link>
        <h2 className='auth-form__title'>{title}</h2>
      </div>
      <form className='auth-form__form' onSubmit={onSubmit}>
        {isRegistration && (
          <label className='auth-form__label'>
            {nameInputLabel}
            <input
              className='auth-form__input'
              type='text'
              name='name'
              required
              onChange={handleInputChange} 
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
          />
        </label>
        <label className='auth-form__label'>
          {passwordInputLabel}
          <input
            className='auth-form__input'
            type='password'
            name='password'
            required
            onChange={handleInputChange} 
          />
        </label>
        <button className='auth-form__button' type='submit' disabled={isButtonDisabled}>
          {buttonLabel}
        </button>
      </form>
      <div className='auth-form__navigation'>
        <p className='auth-form__navigation-text'>{text}</p>
        <Link to={to} className='auth-form__navigation-link'>
          {textLink}
        </Link>
      </div>
    </div>
  );
}
