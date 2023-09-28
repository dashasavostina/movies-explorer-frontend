import "./Login.css";
import { Link } from "react-router-dom";
import React from "react";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

export default function Login({ handleLogin, message }) {
  const { values, errors, handleChange, isValid, resetForm } =
    useFormAndValidation();

  function handleSubmitButton(e) {
    e.preventDefault();
    handleLogin(values["email"], values["password"]);
    resetForm();
  }
  return (
    <section className="login">
      <Link className="header__logo_login" to="/"></Link>
      <h3 className="login__title">Рады видеть!</h3>
      <form className="login__form" onSubmit={handleSubmitButton} noValidate>
        <label className="login__label login__label_email">E-mail</label>
        <input
          required
          type="email"
          name="email"
          id="email-input"
          onChange={handleChange}
          minLength="8"
          maxLength="40"
          value={values.email || ""}
          className="login__input"
          pattern="^[\w]+@[a-zA-Z]+\.[a-zA-Z]{1,3}$"
          error={errors["email"]}
        />
        <span className="login__email-error">{errors.email}</span>
        <label className="login__label login__label_password">Пароль</label>
        <input
          required
          type="password"
          name="password"
          id="password-input"
          minLength="6"
          maxLength="18"
          className="login__input  login__input_password"
          autoComplete="off"
          onChange={handleChange}
          value={values.password || ""}
          error={errors["password"]}
        />
        <span className="login__label login__password-error">
          {errors.password}
        </span>
        <p className="login__error-message">{message}</p>
        <button
          className={
            !isValid ? "login__submit-button_disabled" : "login__submit-button"
          }
          type="submit"
          disabled={isValid ? false : true}
        >
          Войти
        </button>
      </form>
      <div className="login__buttons">
        <p>Ещё не зарегистированы?</p>
        <Link to="signup" className="login__link">
          Регистрация
        </Link>
      </div>
    </section>
  );
}
