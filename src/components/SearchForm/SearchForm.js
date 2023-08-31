import "./SearchForm.css";
import React from "react";

export default function SearchForm({
  onSearch,
  onFilter,
  defaultValue,
  isLoading,
}) {
  const [error, setError] = React.useState("");

  const [values, setValues] = React.useState(defaultValue);

  function handleShortChange(event) {
    const newValues = {
      ...values,
      short: event.target.checked,
    };
    setValues(newValues);
    onFilter(newValues);
  }

  function handleSearchChange(event) {
    setError(""); // очищаем поле от ошибок
    setValues({
      ...values,
      search: event.target.value,
    });
  }

  function searchMovie() {
    setError("");
    onSearch(values).catch((err) => {
      setError(
        "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз."
      );
      return Promise.reject(err);
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (values.search.trim() === "") {
      setError("Нужно ввести ключевое слово");
      return;
    }
    searchMovie();
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit} noValidate>
        <input
          type="search"
          autoComplete="off"
          className="search__input"
          placeholder="Фильм"
          value={values.search}
          onChange={handleSearchChange}
          required
        />
        <button type="submit" className="search__button" disabled={isLoading} />
      </form>
      <span className="search__error">{error}</span>
      <div className="search__tumb-block">
        <label className="search__switch">
          <input
            className="search__switch-input"
            type="checkbox"
            checked={values.short}
            onChange={handleShortChange}
          />
          <span className="search__switch-slider search__switch-slider-round" />
        </label>
        <p className="search__switch-text">Короткометражки</p>
      </div>
    </section>
  );
}
