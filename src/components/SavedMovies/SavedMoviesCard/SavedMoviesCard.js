import React from "react";

// нужно сделать тернарник, для того что бы если мы не добавляли никаких карт ничего не отрисосывалось бы
function SavedMoviesCard(props) {

  const [isSaveMovie, setIsSaveMovie] = React.useState(false);
  let text = props.card.duration + " мин";

  if (props.card.duration >= 60) {
    text =
      ((props.card.duration / 60) | 0) +
      " ч " +
      (props.card.duration % 60) +
      " мин";
  }

  const onDislikeClick = () => {
    props.handleDeleteMovie(props.card._id);
  };

  return (
    <article className={isSaveMovie ? "saved-movie" : "saved-movie"}>
      <img
        className="saved-movie__image"
        src={props.card.image}
        alt="Фильм"
      />
      <div className="saved-movie__description">
        <div className="saved-movie__info">
          <h2 className="saved-movie__text">{props.card.nameRU}</h2>
          <p className="saved-movie__duration">{text}</p>
        </div>
        <button
          type="button"
          aria-label="Нравится"
          className="saved-movie__stroke"
          onClick={onDislikeClick}
        ></button>
      </div>
    </article>
  );
}

export default SavedMoviesCard;
