import React, { useState } from 'react';
import { AuthForm } from '../AuthForm/AuthForm';
import { useFormWithValidation } from '../../hooks/validation';

export function Login({
  onLogin,
  isLoading,
  updateErrorMessage,
  showUpdateError,
}) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values.email, values.password);
  };

  return (
    <main className="content">
      <AuthForm
        title="Рады видеть!"
        emailInput="E-mail"
        valueEmail={values.email || ''}
        passwordInput="Пароль"
        valuePassword={values.password || ''}
        submitButton="Войти"
        submitButtonLoading="Войти..."
        text="Ещё не зарегистрированы?"
        to="/signup"
        textLink="Регистрация"
        isRegistration={false}
        onChange={handleChange}
        onSubmit={handleSubmit}
        errors={errors}
        isValid={isValid}
        updateErrorMessage={updateErrorMessage}
        showUpdateError={showUpdateError}
        isLoading={isLoading}
      />
    </main>
  );
}
