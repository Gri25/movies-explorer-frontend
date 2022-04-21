import React from "react";

function MoviesCard(props) {
  return (
    <article className="movie-card">
      <img src={`https://api.nomoreparties.co/${props.card.image.url}`} className="movie-card__image" alt="Фильм" />
      <div className="movie-card__description">
        <div className="movie-card__info">
          <h2 className="movie-card__text">{props.card.nameRU}</h2>
          <p className="movie-card__duration">{`${props.card.duration} м`}</p>
        </div>
        <button
          type="button"
          aria-label="Нравится"
          className="movie-card__stroke" /*movie-card__stroke_active*/
        ></button>
      </div>
    </article>
  );
}

export default MoviesCard;
