import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import "./SavedMovies.css";
import Footer from "../Footer/Footer";
import React from "react";
import {
  filterByNameMovie,
  filterMovieDuration,
} from "../../utils/movieFilter";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { SavedMoviesContext } from "../../contexts/SavedMoviesContext";

export default function SavedMovies({ isLoading, deleteMovie }) {
  const { savedMovies } = React.useContext(SavedMoviesContext); // Подписываемся на контекст
  const [movies, setMovies] = React.useState(savedMovies);

  const [values, setValues] = React.useState({
    search: "",
    short: false,
  });

  function updatedMovies(values) {
    const allMovies = filterByNameMovie(savedMovies, values.search);
    const filteredMovies = values.short
      ? filterMovieDuration(allMovies)
      : allMovies;

    setMovies(filteredMovies);
  }

  // Поиск сохранённых фильмов
  function searchMovie(values) {
    updatedMovies(values);
    setValues(values);
    return Promise.resolve();
  }

  function filterMovie(value) {
    const newValues = {
      ...values,
      short: value.short,
    };

    updatedMovies(newValues);
    setValues(newValues);
  }

  React.useEffect(() => {
    updatedMovies(values);
  }, [savedMovies]);

  React.useEffect(() => {
    localStorage.setItem("searchSavedMovies", JSON.stringify(values));
  }, [values]);

  return (
    <>
      <Header />
      <SearchForm
        onSearch={searchMovie}
        onFilter={filterMovie}
        isLoading={isLoading}
        defaultValue={values}
      />
      <section className="saved-movies">
        {movies.length > 0 ? (
          isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList
              movies={movies}
              isLike={true}
              deleteMovie={deleteMovie}
            />
          )
        ) : (
          <p className="movies__error">Ничего не найдено</p>
        )}
      </section>
      <Footer />
    </>
  );
}
