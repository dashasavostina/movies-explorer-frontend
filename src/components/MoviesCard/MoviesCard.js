import { Link, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import "./MoviesCard.css";
import { urlServer } from "../../utils/constants";
import React from "react";
import { SavedMoviesContext } from "../../contexts/SavedMoviesContext";

export default function MoviesCard({ movie, isLike, likeMovie, deleteMovie }) {
  const location = useLocation();
  const { savedMovies } = React.useContext(SavedMoviesContext); // Подписываемся на контекст

  const movieDuration = (duration) => {
    const hours = Math.floor(duration / 60);
    const hoursStr = hours > 0 ? `${hours}ч` : "";
    const minutes = duration - hours * 60;
    const minutesStr = minutes > 0 ? `${minutes}м` : "";
    return hoursStr + minutesStr;
  };

  const isLiked = savedMovies.some((item) => {
    return movie.id === item.movieId;
  });

  // удалить сохранённый фильм
  const savedItemMovie = isLike
    ? movie
    : savedMovies.find((item) => {
        return movie.id === item.movieId;
      });

  // удалить фильм из сохранённых
  function handleDeleteMovie() {
    deleteMovie(savedItemMovie._id);
  }

  // добавить фильм в сохранённые
  function handleLikeMovie() {
    likeMovie(movie);
  }

  return (
    <section className="card">
      <Link className="card__link" // to={movie.trailerLink.replace("https", "")}
      >
        <img
          className="card__img"
          src={
            location.pathname === "/movies"
              ? `${urlServer + movie.image.url}`
              : `${movie.image}`
          }
          alt={movie.nameRU}
        />
        <div className="card__subtext">
          <div className="card__group">
            <h2 className="card__title">{movie.nameRU}</h2>
            <p className="card__duration">{movieDuration(movie.duration)}</p>
          </div>
          {isLike ? (
            <button
              type="button"
              className="card__save-button card__save-button_unsave"
              onClick={handleDeleteMovie}
            />
          ) : isLiked ? (
            <button
              type="button"
              className="card__save-button card__save-button_liked"
              onClick={handleDeleteMovie}
            />
          ) : (
            <button
              type="button"
              className="card__save-button"
              onClick={handleLikeMovie}
            />
          )}
        </div>
      </Link>
    </section>
  );
}
