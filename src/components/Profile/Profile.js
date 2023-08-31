import Header from "../Header/Header";
import "./Profile.css";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

export default function Profile({ logOut, submitHandler, message }) {
  const { currentUser } = React.useContext(CurrentUserContext);
  const { values, errors, setValues, handleChange, isValid } =
    useFormAndValidation();

  const [isEdit, setIsEdit] = React.useState(false);
  const [isDisable, setIsDisable] = React.useState(false);

  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
  }, [currentUser.name, currentUser.email, setValues]);

  useEffect(() => {
    if (
      currentUser.name !== values.name ||
      currentUser.email !== values.email
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [currentUser.name, currentUser.email, values.name, values.email]);

  function toggleEdit() {
    setIsEdit(!isEdit);
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    submitHandler({ name: values["name"], email: values["email"] });
    setIsDisable(false);
  };

  return (
    <>
      <Header />
      <section className="profile">
        <h3 className="profile__title">{`Привет, ${currentUser.name}!`}</h3>
        <form className="profile__form" onSubmit={onSubmitForm} noValidate>
          <div className="profile__form-content">
            <p className="profile__subtitle">Имя</p>
            <input
              required
              type="text"
              name="name"
              id="name-input"
              minLength="1"
              maxLength="40"
              value={values.name || ""}
              className="profile__subtitle profile__subtitle_input"
              label="Имя"
              onChange={handleChange}
              disabled={isEdit ? false : true}
              error={errors["name"]}
              pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
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
              value={values.email || ""}
              className="profile__subtitle profile__subtitle_input"
              label="Имя"
              onChange={handleChange}
              disabled={isEdit ? false : true}
              error={errors["email"]}
              pattern="^[\w]+@[a-zA-Z]+\.[a-zA-Z]{1,3}$"
            />
          </div>
          <p className="profile__error-message">{message}</p>
          <div className="profile__buttons">
            {isEdit ? (
              <button
                className={
                  !isValid || !isDisable
                    ? "profile__submit-button_disabled"
                    : "profile__submit-button"
                }
                type="submit"
                disabled={isValid && isDisable ? false : true}
              >
                Сохранить
              </button>
            ) : (
              <>
                <button
                  className="profile__edit-button"
                  type="button"
                  onClick={toggleEdit}
                >
                  Редактировать
                </button>
                <Link
                  to="/"
                  className="profile__logout-button"
                  type="button"
                  onClick={logOut}
                >
                  Выйти из аккаунта
                </Link>
              </>
            )}
          </div>
        </form>
      </section>
    </>
  );
}
