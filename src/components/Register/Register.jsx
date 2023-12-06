import React, { useState } from 'react';
import { AuthForm } from '../AuthForm/AuthForm';
import { useFormWithValidation } from '../../hooks/validation';

export function Register({
  onRegister,
  isLoading,
  updateErrorMessage,
  showUpdateError,
}) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values.name, values.email, values.password);
  };

  return (
    <main className="content">
      <AuthForm
        title="Добро пожаловать!"
        nameInput="Имя"
        valueName={values.name || ''}
        emailInput="E-mail"
        valueEmail={values.email || ''}
        passwordInput="Пароль"
        valuePassword={values.password || ''}
        submitButton="Зарегистрироваться"
        submitButtonLoading="Зарегистрироваться..."
        text="Уже зарегистрированы?"
        to="/signin"
        textLink="Войти"
        isRegistration={true}
        onSubmit={handleSubmit}
        onChange={handleChange}
        errors={errors}
        isValid={isValid}
        updateErrorMessage={updateErrorMessage}
        showUpdateError={showUpdateError}
        isLoading={isLoading}
      />
    </main>
  );
}
