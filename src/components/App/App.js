import "./App.css";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import React, { useState } from "react";
import Main from "../Main/Main";
import { Movies } from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { apiAuth } from "../../utils/apiAuth";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { SavedMoviesContext } from "../../contexts/SavedMoviesContext";
import { mainApi } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import { urlServer } from "../../utils/constants";

import {
  filterByNameMovie,
  filterMovieDuration,
} from "../../utils/movieFilter";

function App() {
  const [isLogged, setLogged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const token = localStorage.getItem("token");
  const location = useLocation();

  function updateMovies(values) {
    const movies = JSON.parse(localStorage.getItem("allMovies"));

    let filteredMovies = filterByNameMovie(movies, values.search);
    localStorage.setItem("filteredMovies", JSON.stringify(filteredMovies));
    filterMovies(values);
  }

  function filterMovies(movies) {
    const filteredMovies =
      JSON.parse(localStorage.getItem("filteredMovies")) || [];
    const resultFilterMovies = movies.short
      ? filterMovieDuration(filteredMovies)
      : filteredMovies;

    setCards(resultFilterMovies);
  }

  React.useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      apiAuth
        .checkToken(userToken)
        .then((res) => {
          setCurrentUser(res);
          setLogged(true);
          setIsLoading(true);
          history.push(location.pathname);
        })
        .catch((err) => {
          localStorage.removeItem("token");
          console.log(`Возникла ошибка верификации токена: ${err}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [history, isLogged]);

  function searchMovies(values) {
    setIsLoading(true);
    return moviesApi
      .getMovies()
      .then((movies) => {
        localStorage.setItem("allMovies", JSON.stringify(movies));
        updateMovies(values);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  const showMessage = (text) => {
    setErrorMessage(text);
    setTimeout(() => setErrorMessage(""), 2500);
  };

  // регистрация
  function handleRegister(name, email, password) {
    apiAuth
      .register(name, email, password)
      .then(() => {
        history.push("/signin");
      })
      .catch(() => showMessage("При регистрации профиля произошла ошибка."));
  }

  //логин
  function handleLogin(password, email) {
    apiAuth
      .authorize(password, email)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLogged(true);
          history.push("/movies");
        }
      })
      .catch(() => showMessage("При авторизации профиля произошла ошибка."));
  }

  // выход
  function handleLogout() {
    localStorage.removeItem("token");
    setLogged(false);
    setCurrentUser({
      name: "",
      email: "",
    });
    setCards([]);
    setSavedMovies([]);
    localStorage.clear();
  }

  // редактирование профиля
  function updateUserInfo(dataUser) {
    mainApi
      .updateUserInfo(dataUser, token)
      .then((userDataUpdated) => {
        setCurrentUser({
          name: userDataUpdated.name,
          email: userDataUpdated.email,
        });
        showMessage('Профиль успешно обновлён!')
      })
      .catch(() => showMessage("При обновлении профиля произошла ошибка."));
  }

  // добавить фильм в сохранённые

  function handleMovieLike(movie) {
    mainApi
      .createMovie({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: urlServer + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: urlServer + movie.image.formats.thumbnail.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
      .then((movie) => {
        setSavedMovies([movie, ...savedMovies]);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  React.useEffect(() => {
    if (isLogged) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([user, movies]) => {
          setCurrentUser(user);
          setSavedMovies(movies);
        })
        .catch((err) => console.log(`Ошибка получения данных: ${err}`));
    }
  }, [isLogged]);

  function deleteMovie(id) {
    mainApi
      .deleteMovie(id)
      .then(() => {
        setSavedMovies((savedMovies) => {
          return savedMovies.filter((movie) => movie._id !== id);
        });
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <SavedMoviesContext.Provider value={{ savedMovies }}>
        <div className="app">
          <Switch>
            <ProtectedRoute
              exact
              path="/movies"
              component={Movies}
              isLogged={isLogged}
              movies={cards}
              onSearch={searchMovies}
              onFilter={filterMovies}
              isLoading={isLoading}
              likeMovie={handleMovieLike}
              deleteMovie={deleteMovie}
            />
            <ProtectedRoute
              exact
              path="/saved-movies"
              component={SavedMovies}
              isLogged={isLogged}
              isLoading={isLoading}
              deleteMovie={deleteMovie}
            />
            <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
              isLogged={isLogged}
              logOut={handleLogout}
              submitHandler={updateUserInfo}
              message={errorMessage}
            />
            <Route path="/signup">
              <Register
                handleRegister={handleRegister}
                message={errorMessage}
              />
            </Route>
            <Route path="/signin">
              <Login handleLogin={handleLogin} message={errorMessage} />
            </Route>
            <Route path="/">
              <Main />
            </Route>
            <Route path="*"><NotFound /></Route>
          </Switch>
        </div>
      </SavedMoviesContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
