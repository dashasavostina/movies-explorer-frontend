import "./Login.css";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <section className="login">
      <Link className="header__logo_login" to="/"></Link>
      <h3 className="login__title">Рады видеть!</h3>
      <form className="login__form">
        <label className="login__label login__label_email">E-mail</label>
        <input
          required
          type="email"
          name="email"
          id="email-input"
          minLength="8"
          maxLength="40"
          value="pochta@yandex.ru|"
          className="login__input"
        />
        <span className="email-input-error login__input-error" />
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
        />
        <span className="password-input-error login__label register__input-error" />

        <button className="login__submit-button" type="submit">
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
