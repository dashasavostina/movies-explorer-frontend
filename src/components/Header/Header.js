import { Link } from "react-router-dom";
import "./Header.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

export default function Header() {
  const [burger, setBurger] = useState(false);
  const location = useLocation();
  function handleBurgerClick () {
    setBurger(!burger);
    burger ? enablePageScroll() : disablePageScroll();
  }
  return location.pathname === "/movies" ||
    location.pathname === "/saved-movies" ||
    location.pathname === "/profile" ? (
    <header className={burger ? "header-logged_burger" : "header-logged"}>
      <Link className="header-logged__logo" to="/"></Link>
      <div className="header-logged__body">
        <div
          className={burger ? "header-logged__burger_active" : "header-logged__burger"}
          onClick={handleBurgerClick}
        />
        <nav className={burger ? "header-logged__menu_active" : "header-logged__menu"}>
          <ul className="header-logged__list">
            <li className="header-logged__list-link">
              <Link
                to="/"
                className={burger ? "header-logged__link" : "header-logged__link header-logged__link_none"}
              >
                Главная
              </Link>
            </li>
            <li className="header-logged__list-link">
              <Link
                to="/movies"
                className={
                  location.pathname === "/movies"
                    ? "header-logged__link header-logged__link_active"
                    : "header-logged__link"
                }
              >
                Фильмы
              </Link>
            </li>
            <li className="header-logged__list-link header-logged__list-link_length">
              <Link
                to="/saved-movies"
                className={
                  location.pathname === "/saved-movies"
                    ? "header-logged__link_active"
                    : "header-logged__link"
                }
              >
                Сохранённые фильмы
              </Link>
            </li>
          </ul>
          <Link to="/profile" className="header-logged__account-button">
            Аккаунт
          </Link>
        </nav>
        <div className={burger ? "header-logged__law_active" : "header-logged__law"}></div>
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
