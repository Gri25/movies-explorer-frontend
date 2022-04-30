import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const superCards = props.cards.concat([]);
  return (
    <section className="movie-cards">
      {superCards.splice(0, props.downloadCards).map((card) => (
        <MoviesCard key={card._id} card={card} />
      ))}
    </section>
  );
}

export default MoviesCardList;
