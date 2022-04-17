import React from "react";
import film from "../../../images/films/33slova.png";
import film1 from "../../../images/films/kinoalmonah.png";
import film2 from "../../../images/films/vpogonezaB.png";

function SavedMoviesCard() {
  return (
    <>
      <article className="saved-movie">
        <img src={film} className="saved-movie__image" alt="Фильм" />
        <div className="saved-movie__description">
          <div className="saved-movie__info">
            <h2 className="saved-movie__text">33 слова о дизайне</h2>
            <p className="saved-movie__duration">1ч 47м</p>
          </div>
          <button
            type="button"
            aria-label="Нравится"
            className="saved-movie__stroke"
          ></button>
        </div>
      </article>
      <article className="saved-movie">
        <img src={film1} className="saved-movie__image" alt="Фильм" />
        <div className="saved-movie__description">
          <div className="saved-movie__info">
            <h2 className="saved-movie__text">Киноальманах «100 лет дизайна»</h2>
            <p className="saved-movie__duration">1ч 3м</p>
          </div>
          <button
            type="button"
            aria-label="Нравится"
            className="saved-movie__stroke"
          ></button>
        </div>
      </article>
      <article className="saved-movie">
        <img src={film2} className="saved-movie__image" alt="Фильм" />
        <div className="saved-movie__description">
          <div className="saved-movie__info">
            <h2 className="saved-movie__text">В погоне за Бенкси</h2>
            <p className="saved-movie__duration">1ч 42м</p>
          </div>
          <button
            type="button"
            aria-label="Нравится"
            className="saved-movie__stroke"
          ></button>
        </div>
      </article>
    </>
  );
}

export default SavedMoviesCard;
