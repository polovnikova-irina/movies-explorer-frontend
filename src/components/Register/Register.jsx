import React, {useState} from 'react';
import {AuthForm} from '../AuthForm/AuthForm';

export function Register({ onRegister }) {

  const [formValue, setFormValue] = useState({
    name: '',
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
    onRegister(formValue.name, formValue.email, formValue.password);
  };

  return (
    <main className="content">
    <AuthForm
      title="Добро пожаловать!"
      nameInput="Имя"
      valueName = {formValue.name}
      emailInput="E-mail"
      valueEmail = {formValue.email}
      passwordInput="Пароль"
      valuePassword = {formValue.password}
      submitButton="Зарегистрироваться"
      text="Уже зарегистрированы?"
      to="/signin"
      textLink="Войти"
      isRegistration={true}
      onSubmit={handleSubmit}
      onChange={handleChange}
    />
    </main>
  );
}
