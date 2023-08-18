import { Link } from "react-router-dom";
import "./Header.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [burger, setBurger] = useState(false);
  const location = useLocation();
  return location.pathname === "/movies" ||
    location.pathname === "/saved-movies" ||
    location.pathname === "/profile" ? (
    <header className={burger ? "header-logged_burger" : "header-logged"}>
      <Link className="header__logo" to="/"></Link>
      <div className="header__body">
        <div
          className={burger ? "header__burger_active" : "header__burger"}
          onClick={() => setBurger(!burger)}
        />
        <nav className={burger ? "header__menu_active" : "header__menu"}>
          <ul className="header__list">
            <li className="header__list-link">
              <Link
                to="/"
                className={burger ? "header__link" : "header__link_none"}
              >
                Главная
              </Link>
            </li>
            <li className="header__list-link">
              <Link
                to="/movies"
                className={
                  location.pathname === "/movies"
                    ? "header__link_active"
                    : "header__link"
                }
              >
                Фильмы
              </Link>
            </li>
            <li className="header__list-link header__list-link_length">
              <Link
                to="/saved-movies"
                className={
                  location.pathname === "/saved-movies"
                    ? "header__link_active"
                    : "header__link "
                }
              >
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
          <Link to="/profile" className="header__account-button" type="button">
            Аккаунт
          </Link>
        </nav>
        <div className={burger ? "header__law_active" : "header__law"}></div>
      </div>
    </header>
  ) : (
    <header className="header">
      <Link className="header__logo" to="/"></Link>
      <div className="header__buttons">
        <Link to="/signup" className="header__register-button">
          Регистрация
        </Link>
        <Link to="/signin" className="header__login-button">
          Войти
        </Link>
      </div>
    </header>
  );
}
