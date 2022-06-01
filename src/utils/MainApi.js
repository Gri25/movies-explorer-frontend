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
        Authorization: `Bearer ${token}`,
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
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._checkAnswer);
  }

  savedCard(card, token) {
    const defaulImg =
      "https://images.puella-magi.net/thumb/2/27/No_Image_Wide.svg/1600px-No_Image_Wide.svg.png?20110202071158";
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image:
          card.image.url !== null
            ? `https://api.nomoreparties.co${card.image.url}` : defaulImg,
        trailerLink:
          card.trailerLink ||
          `https://www.youtube.com/results?search_query=${card.nameRU}`,
        thumbnail:
          card.image.url !== null
            ? `https://api.nomoreparties.co${card.image.url}`
            : defaulImg,
        movieId: card.id,
        nameRU: card.nameRU || card.nameEN,
        nameEN: card.nameEN || card.nameRU,
      }),
    }).then(this._checkAnswer);
  }

  deleteMovie(cardId, token) {
    return fetch(`${this._url}/movies/${cardId}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    })
      .then(this._checkAnswer);
  };

  getSavedCards(token) {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
    }).then(this._checkAnswer);
  }

  /*
          country: card.country || card.director,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: "https://api.nomoreparties.co" + card.image.url,
        trailerLink:
        card.trailerLink || "https://api.nomoreparties.co" + card.image.url,
        thumbnail: "https://api.nomoreparties.co" + card.image.url,
        movieId: card.id,
        nameRU: card.nameRU || card.nameEN ,
        nameEN: card.nameEN || card.nameRU  ,






    savedCard(cards) {
    return fetch(this._url + '/movies', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        id: cards.id,
        country: cards.country,
        director: cards.director,
        duration: cards.duration,
        year: cards.year,
        description: cards.description,
        image: "https://api.nomoreparties.co" + cards.image.url || null,
        trailerLink: cards.trailerLink,
        thumbnail: "https://api.nomoreparties.co" + cards.image.url,
        movieId: cards.id,
        nameRU: cards.nameRU,
        nameEN: cards.nameEN
      })
    })
    .then(this._checkAnswer);
  };



  savedCard(
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      movieId,
      thumbnail,
    },
    token
  ) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: country,
        director: director,
        duration: duration,
        year: year,
        description: description,
        image: image,
        trailerLink: trailerLink,
        nameRU: nameRU,
        nameEN: nameEN,
        movieId: movieId,
        thumbnail: thumbnail,
      }),
    }).then(this._checkAnswer);
  }

  deleteCard(cardId, isLiked, token) {
    return fetch(`${this._url}/cards/${cardId}/likes/`, {
      method: isLiked ? "PUT" : "DELETE",
      headers: {
        ...this._headers,
        'Authorization': `Bearer ${token}`
      },
    }).then(this._checkAnswer);
  }



*/
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
