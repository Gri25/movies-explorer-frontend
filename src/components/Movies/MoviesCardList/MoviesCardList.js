import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  //  const superCards = props.cards.concat([]);
  /*
  const superCards = (
    props.isChecked ? props.shortsMovies : props.cards
  ).concat([]);
  */

  return (
    <section className="movie-cards">
      {props.superCards.splice(0, props.downloadCards).map((card, i) => (
        <MoviesCard key={i} card={card} />
      ))}
    </section>
  );
}

export default MoviesCardList;
