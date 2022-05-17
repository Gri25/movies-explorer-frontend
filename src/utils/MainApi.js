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

  changeUserInfo({ name, email }, token) {
    // console.log(name);
    // console.log(about);
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._checkAnswer);
  }

  _checkAnswer(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    }
    return res.json();
  }
}

const mainApi = new MainApi({
  url: "http://api.movie.diplom.nomoredomains.work",
  headers: {
    "Content-type": "application/json",
  },
});

export default mainApi;
