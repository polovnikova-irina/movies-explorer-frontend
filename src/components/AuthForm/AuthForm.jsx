// import React, { useState } from 'react';
import './AuthForm.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export function AuthForm({
  title,
  onChange,
  nameInput,
  valueName,
  emailInput,
  valueEmail,
  valuePassword,
  passwordInput,
  submitButton,
  onSubmit,
  text,
  to,
  textLink,
  isRegistration,
  errors,
  isValid,
}) {
  return (
    <div className="auth-form">
      <div className="auth-form__header">
        <Link to="/">
          <img className="auth-form__logo" src={logo} alt="Лого" />
        </Link>
        <h2 className="auth-form__title">{title}</h2>
      </div>
      <div>
        <form className="auth-form__form" onSubmit={onSubmit}>
          {isRegistration && (
            <>
            <label className="auth-form__label">
              {nameInput}
              <input
                className="auth-form__input"
                type="text"
                name="name"
                minLength="2"
                maxLength="30"
                pattern="^[A-Za-zА-Яа-яЁё\s]+$"  
                required
                onChange={onChange}
                value={valueName}
                placeholder="Имя"
              />
              <span className='auth-form__input-error input-error'>{errors.name}</span>
            </label>
             </>
          )}

          <label className="auth-form__label">
            {emailInput}
            <input
              className="auth-form__input"
              type="email"
              name="email"
              pattern="^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,6}$"
              required
              onChange={onChange}
              value={valueEmail}
              placeholder="E-mail"
            />
             <span className='auth-form__input-error input-error'>{errors.email}</span>
          </label>
          <label className="auth-form__label">
            {passwordInput}
            <input
              className="auth-form__input"
              type="password"
              name="password"
              minLength="2"
              maxLength="30"
              required
              value={valuePassword}
              onChange={onChange}
              placeholder="Пароль"
            />
            <span className='auth-form__input-error input-error'>{errors.password}</span>
          </label>
          <button
            className={`auth-form__button ${
              isRegistration
                ? 'auth-form__button_type_registration-form'
                : 'auth-form__button_type_login-form'
            } ${!isValid ? 'auth-form__button_disabled' : ''}`}
            type="submit"
            disabled={!isValid} 
          >
            {submitButton}
          </button>
        </form>
      </div>
      <div
        className={`auth-form__navigation ${
          isRegistration
            ? 'auth-form__navigation_type_registration-form'
            : 'auth-form__navigation_type_login-form'
        }`}
      >
        <p className="auth-form__navigation-text">{text}</p>
        <Link to={to} className="auth-form__navigation-link">
          {textLink}
        </Link>
      </div>
    </div>
  );
}
