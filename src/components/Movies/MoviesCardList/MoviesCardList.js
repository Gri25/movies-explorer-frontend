import React from "react";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  React.useEffect(() => {
    props.handleSaveCards(props.savedCard);
  }, []);

  const [buttonYetDisable, setButtonYetDisable] = React.useState(true);

  if (props.filteredMovies === 100) {
    setButtonYetDisable(true);
  }

  return (
    <section className="movie-cards">
      {props.filteredMovies.splice(0, props.downloadCards).map((card, i) => (
        <MoviesCard
          key={i}
          card={card}
          saved={props.saveCard.some(
            (savedCard) => savedCard.movieId === card.id
          )}
          savedCards={props.savedCards}
          handleDeleteMovie={props.handleDeleteMovie}
        />
      ))}
    </section>
  );
}

export default MoviesCardList;
