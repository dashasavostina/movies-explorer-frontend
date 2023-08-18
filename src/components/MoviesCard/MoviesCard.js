import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import film1 from "../../images/film1.jpg";
import "./MoviesCard.css";

export default function MoviesCard() {
  const location = useLocation();
  return (
    <section className="card">
      <img className="card__img" src={film1} alt="картинка фильма" />
      <div className="card__subtext">
        <div className="card__group">
          <h2 className="card__title">33 слова о дизайне</h2>
          <p className="card__duration">1ч42м</p>
        </div>
        <button
          type="button"
          className={
            location.pathname === "/saved-movies"
              ? "card__save-button_unsave"
              : "card__save-button"
          }
        />
      </div>
    </section>
  );
}
