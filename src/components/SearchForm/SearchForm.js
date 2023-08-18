import "./SearchForm.css";

export default function SearchForm() {
  return (
    <section className="search">
      <div className="search__form">
        <input
          type="search"
          autoComplete="off"
          className="search__input"
          placeholder="Фильм"
        />
        <button type="submit" className="search__button" />
      </div>
      <div className="search__tumb-block">
        <label className="switch">
          <input className="switch__input" type="checkbox" />
          <span className="switch__slider switch__slider-round" />
        </label>
        <p className="switch__text">Короткометражки</p>
      </div>
    </section>
  );
}
