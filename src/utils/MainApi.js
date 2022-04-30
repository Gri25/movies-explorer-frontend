class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  //Профиль
  getPersonalInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      },
    }).then(this._checkAnswer);
  }

  _checkAnswer(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    }
    return res.json();
  }
}

//Сервер для массива с фильмами
const mainApi = new MainApi({
  url: "http://api.movie.diplom.nomoredomains.work",
  headers: {
    "Content-type": "application/json",
  },
});

export default mainApi;
