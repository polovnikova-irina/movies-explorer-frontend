import React from 'react';
import {AuthForm} from '../AuthForm/AuthForm';

export function Login() {
  const handleRegistration = (e) => {
    e.preventDefault();
    // Обработка логики регистрации
  };

  return (
    <AuthForm
      title="Рады видеть!"
      emailInputLabel="E-mail"
      passwordInputLabel="Пароль"
      buttonLabel="Зарегистрироваться"
      text="Ещё не зарегистрированы?"
      to="/signup"
      textLink="Регистрация"
      onSubmit={handleRegistration}
      isRegistration={false}
    />
  );
}
