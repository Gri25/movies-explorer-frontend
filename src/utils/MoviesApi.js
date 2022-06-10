class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  //Метод для вызова фильмов
  getCardMovies() {
    return fetch(this._url, {
      method: "GET",
      headers: this._headers,
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
const moviesApi = new Api({
  url: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-type": "application/json",
  },
});

export default moviesApi;
