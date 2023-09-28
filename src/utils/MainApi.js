class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  getUserInfo() {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  updateUserInfo({ name, email }, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: { ...this._headers, Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        name,
        email,
      }),
    }).then((res) => this._checkResponse(res));
  }

  getSavedMovies() {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    }).then((res) => this._checkResponse(res));
  }

  createMovie(data) {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/movies`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => this._checkResponse(res));
  }

  deleteMovie(movieId) {
    const token = localStorage.getItem("token");
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      method: "DELETE",
    }).then((res) => this._checkResponse(res));
  }
}

export const mainApi = new Api({
  baseUrl: "https://api.diplom.dashasavostina.nomoreparties.sbs",
  headers: {
    "Content-Type": "application/json",
  },
});
