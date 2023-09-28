import Header from "../Header/Header";
import "./Profile.css";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <>
      <Header />
      <section className="profile">
        <h3 className="profile__title">Привет, Виталий!</h3>
        <form className="profile__form">
          <div className="profile__form-content">
            <p className="profile__subtitle">Имя</p>
            <input
              required
              type="text"
              name="name"
              id="name-input"
              minLength="1"
              maxLength="40"
              value="Виталий"
              className="profile__subtitle profile__subtitle_input"
              label="Имя"
            />
          </div>
          <div className="profile__form-content">
            <p className="profile__subtitle">E-mail</p>
            <input
              required
              type="text"
              name="email"
              id="email-input"
              minLength="1"
              maxLength="40"
              value="pochta@yandex.ru"
              className="profile__subtitle profile__subtitle_input"
              label="Имя"
            />
          </div>
        </form>
        <button className="profile__edit-button" type="button">
          Редактировать
        </button>
        <Link className="profile__logout-button" type="button">
          Выйти из аккаунта
        </Link>
      </section>
    </>
  );
}
