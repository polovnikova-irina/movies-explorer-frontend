import React from 'react';
import {AuthForm} from '../AuthForm/AuthForm';

export function Login() {
  const handleRegistration = (e) => {
    e.preventDefault();
    
  };

  return (
    <AuthForm
      title="Рады видеть!"
      emailInputLabel="E-mail"
      passwordInputLabel="Пароль"
      buttonLabel="Войти"
      text="Ещё не зарегистрированы?"
      to="/signup"
      textLink="Регистрация"
      onSubmit={handleRegistration}
      isRegistration={false}
    />
  );
}
