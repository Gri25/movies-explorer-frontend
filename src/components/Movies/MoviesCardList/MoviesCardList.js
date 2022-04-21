import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  return (
    <section className="movie-cards">
      {props.cards.map(card => (
          <MoviesCard
            key={card._id}
            card={card}
          />
        ))}
    </section>
  );
}

export default MoviesCardList;

