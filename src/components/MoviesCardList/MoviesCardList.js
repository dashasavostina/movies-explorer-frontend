import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

export default function MoviesCardList({
  movies,
  isLike,
  likeMovie,
  deleteMovie,
}) {
  return (
    <section className="cards">
      {movies.map((movie) => (
        <MoviesCard
          key={movie.id || movie.movieId}
          movie={movie}
          isLike={isLike}
          likeMovie={likeMovie}
          deleteMovie={deleteMovie}
        />
      ))}
    </section>
  );
}
