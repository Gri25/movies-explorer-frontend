import React from "react";

// нужно сделать тернарник, для того что бы если мы не добавляли никаких карт ничего не отрисосывалось бы
function SavedMoviesCard() {
  return (
      <article className="saved-movie">
        <img className="saved-movie__image" alt="Фильм" />
        <div className="saved-movie__description">
          <div className="saved-movie__info">
            <h2 className="saved-movie__text"></h2>
            <p className="saved-movie__duration"></p>
          </div>
          <button
            type="button"
            aria-label="Нравится"
            className="saved-movie__stroke"
          ></button>
        </div>
      </article>
  );
}

export default SavedMoviesCard;
