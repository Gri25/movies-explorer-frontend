import React, { useState, useEffect } from "react";
import SavedMoviesCard from "../SavedMoviesCard/SavedMoviesCard";

function SavedMoviesCardList(props) {
  /*
    короткометражки в сохранёнках включаются на чекбосе только
    после того как мы сохраним новую карточку, но уже после обновления страницы
    мы получаем пустой массив после нажатия на чекбокс
  */

  /*
  const [superPuperSavedCards, setSuperPuperSavedCards] = useState([]);
  useEffect(() => {
    setSuperPuperSavedCards(props.superSaveCards);
  }, []);
  */

  return (
    <section className="movie-cards">
      {props.filteredSavedMovies.map((card, i) => (
        <SavedMoviesCard
          key={i}
          card={card}
          handleDeleteMovie={props.handleDeleteMovie}
        />
      ))}
    </section>
  );
}

export default SavedMoviesCardList;
