import "./Register.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Register() {
  return (
    <section className="register">
      <Link className="header__logo_register" to="/"></Link>
      <h3 className="register__title">Добро пожаловать!</h3>
      <form className="register__form">
        <label className="register__label register__label_name">Имя</label>
        <input
          required
          type="text"
          name="name"
          id="email-input"
          minLength="1"
          maxLength="40"
          value="Виталий"
          className="register__input"
        />
        <span className="email-input-error register__input-error" />
        <label className="register__label register__label_email">E-mail</label>
        <input
          required
          type="email"
          name="email"
          id="email-input"
          minLength="8"
          maxLength="40"
          value="pochta@yandex.ru|"
          className="register__input"
        />
        <span className="email-input-error register__input-error" />
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
          value="12345678910111"
          className="register__input  register__input_password"
          autoComplete="off"
        />
        <span className="password-input-error register__label register__input-error">
          Что-то пошло не так...
        </span>

        <button className="register__submit-button" type="submit">
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
