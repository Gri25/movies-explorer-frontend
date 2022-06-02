import React from "react";

function MoviesCard(props) {
  let text = props.card.duration + " мин";

  if (props.card.duration >= 60) {
    text =
      ((props.card.duration / 60) | 0) +
      " ч " +
      (props.card.duration % 60) +
      " мин";
  }

  const onLikeClick = () => {
    props.savedCards(props.card);
  };
/*
  const onDislikeClick = () => {
    props.handleDislikeMovie(props.card.id);
  };
*/
  return (
    <article className="movie-card">
      <img
        src={`https://api.nomoreparties.co/${props.card.image.url}`}
        className="movie-card__image"
        alt="Фильм"
      />
      <div className="movie-card__description">
        <div className="movie-card__info">
          <h2 className="movie-card__text">{props.card.nameRU}</h2>
          <p className="movie-card__duration">{text}</p>
        </div>
        <button
          type="button"
          aria-label="Нравится"
         // onClick={props.saved ? onDislikeClick : onLikeClick}
          onClick={onLikeClick}
          className={
            props.saved ? "movie-card__stroke_active" : "movie-card__stroke"
          }
        ></button>
      </div>
    </article>
  );
}

export default MoviesCard;
