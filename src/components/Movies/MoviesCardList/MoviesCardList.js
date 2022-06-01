import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {



  return (
    <section className="movie-cards">
      {props.filteredMovies.splice(0, props.downloadCards).map((card, i) => (
        <MoviesCard
          key={i}
          card={card}
          saved={props.saveCard.some((savedCard)=> savedCard.movieId === card.id)}
          savedCards={props.savedCards}
       //   isStrokeAktive={props.isStrokeAktive}
        />
      ))}
    </section>
  );
}

export default MoviesCardList;

//  const superCards = props.cards.concat([]);
/*
  const superCards = (
    props.isChecked ? props.shortsMovies : props.cards
  ).concat([]);
  */
// console.log(props.su)
// const superPuperCards = props.superCards.concat([]);
// console.log(superPuperCards);
