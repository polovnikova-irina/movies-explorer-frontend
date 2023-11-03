import React from 'react';
import {AuthForm} from '../AuthForm/AuthForm';

export function Register() {
  const handleRegistration = (e) => {
    e.preventDefault();
    // Обработка логики регистрации
  };

  return (
    <AuthForm
      title="Добро пожаловать!"
      nameInputLabel="Имя"
      emailInputLabel="E-mail"
      extraInputLabel="Пароль"
      buttonLabel="Войти"
      text="Уже зарегистрированы?"
      to="/signin"
      textLink="Войти"
      onSubmit={handleRegistration}
    />
  );
}
