import SearchForm from "../SearchForm/SearchForm";
import "./Movies.css";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import React from "react";
import Preloader from "../Preloader/Preloader";
import { useMediaQuery } from "../../hooks/useMediaQuery";

import {
  LG_ROW_CARD_COUNT,
  MD_INITIAL_CARD_COUNT,
  MD_ROW_CARD_COUNT,
  SM_ROW_CARD_COUNT,
  LG_INITIAL_CARD_COUNT,
  SM_INITIAL_CARD_COUNT,
} from "../../utils/constants";
import { moviesApi } from "../../utils/MoviesApi";
import { filterMovieDuration } from "../../utils/movieFilter";

export const Movies = ({
  onSearch,
  onFilter,

  likeMovie,
  deleteMovie,
}) => {
  const [values, setValues] = React.useState(
    JSON.parse(localStorage.getItem("searchMovies")) || {
      search: "",
      short: false,
    }
  );

  const [movies, setMovies] = React.useState(
    JSON.parse(localStorage.getItem("filteredMovies")) || []
  );

  const [isLoading, setIsLoading] = React.useState(false);
  let allMoviesData = localStorage.getItem("allMovies");

  function updatedMovies(movies) {
    const filteredMovies =
      JSON.parse(localStorage.getItem("filteredMovies")) || [];
    const resultFilterMovies = movies.short
      ? filterMovieDuration(filteredMovies)
      : filteredMovies;

    setMovies(resultFilterMovies);
  }

  const submitHandler = async (movies) => {
    try {
      setIsLoading(true);

      if (!allMoviesData) {
        const allMovies = await moviesApi.getMovies();
        localStorage.setItem("allMovies", JSON.stringify(allMovies));
        allMoviesData = localStorage.getItem("allMovies");
      }

      onSearch(movies);
      updatedMovies(movies);
      setValues(movies);

      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  function filterMovies(value) {
    const newValues = {
      ...values,
      short: value.short,
    };

    onFilter(newValues);
    setValues(newValues);
    updatedMovies(newValues);
  }

  React.useEffect(() => {
    updatedMovies(values);
  }, [setMovies]);

  React.useEffect(() => {
    localStorage.setItem("searchMovies", JSON.stringify(values));
  }, [values]);

  // блок про отображение карточек в зависимости от разрешения экрана
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const isTablet = useMediaQuery("(min-width: 768px)");

  const cardColumnCount = isDesktop
    ? LG_ROW_CARD_COUNT
    : isTablet
    ? MD_ROW_CARD_COUNT
    : SM_ROW_CARD_COUNT;

  const initialCardCount = isDesktop
    ? LG_INITIAL_CARD_COUNT
    : isTablet
    ? MD_INITIAL_CARD_COUNT
    : SM_INITIAL_CARD_COUNT;

  const [visibleCardCount, setVisibleCardCount] =
    React.useState(initialCardCount);

  const roundedVisibleCardCount =
    Math.floor(visibleCardCount / cardColumnCount) * cardColumnCount;

  const handleClick = () => {
    calculateCardCount();
  };

  const calculateCardCount = () => {
    if (isDesktop) {
      return setVisibleCardCount(visibleCardCount + LG_ROW_CARD_COUNT);
    }

    if (isTablet) {
      return setVisibleCardCount(visibleCardCount + MD_ROW_CARD_COUNT);
    }

    setVisibleCardCount(visibleCardCount + SM_ROW_CARD_COUNT);
  };

  return (
    <>
      <Header />
      <SearchForm
        onSearch={submitHandler}
        onFilter={filterMovies}
        defaultValue={values}
        isLoading={isLoading}
      />
      <section className="movies">
        {movies.length > 0 ? (
          isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList
              movies={movies.slice(0, roundedVisibleCardCount)}
              likeMovie={likeMovie}
              deleteMovie={deleteMovie}
            />
          )
        ) : (
          <p className="movies__error">Ничего не найдено</p>
        )}
        {movies.length > 0 && movies.length > roundedVisibleCardCount && (
          <button
            type="button"
            className="movies__more-button"
            onClick={handleClick}
          >
            Ещё
          </button>
        )}
      </section>
      <Footer />
    </>
  );
};
