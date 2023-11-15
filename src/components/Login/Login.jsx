import React, { useState } from "react";
import {AuthForm} from '../AuthForm/AuthForm';

export function Login({ onLogin }) {
 
  const [formValue, setFormValue] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(formValue.email, formValue.password);
  };


  return (
  <main className="content">
    <AuthForm
      title="Рады видеть!"
      emailInput="E-mail"
      valueEmail = {formValue.email}
      passwordInput="Пароль"
      valuePassword = {formValue.password}
      submitButton="Войти"
      text="Ещё не зарегистрированы?"
      to="/signup"
      textLink="Регистрация"
      isRegistration={false}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  </main>
  );
}
