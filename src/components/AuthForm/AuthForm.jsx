import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

export function AuthForm({
  title,
  nameInputLabel,
  emailInputLabel,
  passwordInputLabel,
  buttonLabel,
  onSubmit,
  text,
  to,
  textLink,

}) {
  return (
    <div className="auth-form">
      <div className="auth-form__header">
        <img className="auth-form__logo" src={logo} alt="Логотип" />
        <h2 className="auth-form__title">{title}</h2>
      </div>
      <form className="auth-form__form" onSubmit={onSubmit}>
        <label className="auth-form__label">
          {nameInputLabel}
          <input className="auth-form__input" type="text" name="name" />
        </label>
        <label className="auth-form__label">
          {emailInputLabel}
          <input className="auth-form__input" type="email" name="email" />
        </label>
        <label className="auth-form__label">
          {passwordInputLabel}
          <input className="auth-form__input" type="password" name="password" />
        </label>
        <button className="auth-form__button" type="submit">
          {buttonLabel}
        </button>
      </form>
      <div className="auth-form__navigation">
        <p className="auth-form__navigation-text">{text}</p>
        <Link to={to} className="auth-form__navigation-link">
          {textLink}
        </Link>
      </div>
    </div>
  );
}
