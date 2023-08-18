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
        <label className="search__switch">
          <input className="search__switch-input" type="checkbox" />
          <span className="search__switch-slider search__switch-slider-round" />
        </label>
        <p className="search__switch-text">Короткометражки</p>
      </div>
    </section>
  );
}
