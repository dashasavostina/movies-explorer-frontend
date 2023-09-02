import "./Register.css";
import React from "react";
import { Link } from "react-router-dom";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

export default function Register({ handleRegister, message }) {
  const { values, errors, handleChange, isValid, resetForm } =
    useFormAndValidation();

  function handleSubmitButton(e) {
    e.preventDefault();
    handleRegister(values.name, values.email, values.password);
    resetForm();
  }
  return (
    <section className="register">
      <Link className="header__logo_register" to="/"></Link>
      <h3 className="register__title">Добро пожаловать!</h3>
      <form className="register__form" onSubmit={handleSubmitButton} noValidate>
        <label className="register__label register__label_name">Имя</label>
        <input
          required
          type="text"
          name="name"
          id="name-input"
          minLength="2"
          maxLength="30"
          value={values.name || ""}
          className="register__input"
          onChange={handleChange}
          autoComplete="off"
          pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
        />
        <span className="register__name-error">{errors.name}</span>
        <label className="register__label register__label_email">E-mail</label>
        <input
          required
          type="email"
          name="email"
          id="email-input"
          minLength="8"
          maxLength="40"
          value={values.email || ""}
          className="register__input"
          onChange={handleChange}
          autoComplete="off"
          pattern="^[\w]+@[a-zA-Z]+\.[a-zA-Z]{1,3}$"
        />
        <span className="register__email-error">{errors.email}</span>
        <label className="register__label register__label_password">
          Пароль
        </label>
        <input
          required
          type="password"
          name="password"
          id="password-input"
          placeholder="Пароль"
          minLength="6"
          maxLength="18"
          value={values.password || ""}
          className="register__input  register__input_password"
          autoComplete="off"
          onChange={handleChange}
        />
        <span className="register__label register__password-error">
          {errors.password}
        </span>
        <p className="register__error-message">{message}</p>
        <button
          className={
            !isValid
              ? "register__submit-button_disabled"
              : "register__submit-button"
          }
          type="submit"
          disabled={isValid ? false : true}
        >
          Зарегистрироваться
        </button>
      </form>
      <div className="register__buttons">
        <p>Уже зарегистированы?</p>
        <Link to="signin" className="register__link">
          Войти
        </Link>
      </div>
    </section>
  );
}
