import "./App.css";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
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
import { urlServer } from "../../utils/constants";
import Header from "../Header/Header";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

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

  const showMessage = (text) => {
    setErrorMessage(text);
    setTimeout(() => setErrorMessage(""), 2500);
  };

  // регистрация
  function handleRegister(name, email, password) {
    apiAuth
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        if (err === "Ошибка: 409")
          showMessage("Пользователь с таким email уже существует.");
        else if (err === "Ошибка: 400") {
          showMessage("При регистрации пользователя возникла ошибка.");
        } else if (err === "Ошибка: 500") {
          showMessage("Ошибка сервера. Попробуйте позже.");
        }
      });
  }

  //логин
  function handleLogin(email, password) {
    apiAuth
      .authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLogged(true);
          history.push("/movies");
        }
      })
      .catch((err) => {
        if (err === "Ошибка: 401") showMessage("Неверные email или пароль");
        else if (err === "Ошибка: 400") {
          showMessage("При авторизации пользователя возникла ошибка.");
        } else if (err === "Ошибка: 500") {
          showMessage("Ошибка сервера. Попробуйте позже.");
        }
      });
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
        showMessage("Профиль успешно обновлён!");
      })
      .catch((err) => {
        if (err.statusCode === 500)
          showMessage("Пользователь с такими данными уже существует.");
      });
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
    setIsLoading(true);
    if (isLogged) {
      Promise.all([mainApi.getUserInfo(), mainApi.getSavedMovies()])
        .then(([user, movies]) => {
          setCurrentUser(user);
          setSavedMovies(movies);
          setIsLoading(false);
        })
        .catch((err) => console.log(`Ошибка получения данных: ${err}`));
      setIsLoading(false);
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
              {isLogged ? <Redirect to="/movies" /> : ""}
            </Route>
            <Route path="/signin">
              <Login handleLogin={handleLogin} message={errorMessage} />
              {isLogged ? <Redirect to="/movies" /> : ""}
            </Route>
            <Route exact path="/">
              {isLogged ? (
                <Header isLogged={true} />
              ) : (
                <Header isLogged={false} />
              )}
              <Main />
            </Route>
            <Route exact path="/*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </SavedMoviesContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
