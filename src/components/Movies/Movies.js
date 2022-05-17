import React, { useState, useEffect } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import SearchForm from "./SearchForm/SearchForm";

function Movies(props) {
  console.log(props.cards);
  const superCards = (
    props.isChecked ? props.shortsMovies : props.cards
  ).concat([]);
    console.log(superCards);
  const [value, setValue] = useState("");

  const searchMovies = (event) => {
    setValue(event.target.value);
  };


  const filteredMovies = (superCards) => {
  //  console.log(superCards, value);

    superCards = filtered(superCards);
   // console.log(superCards);
    function filtered(superCards) {
      return superCards.filter(

        (card) => {

     //     console.log(card.nameRU, card.nameEN);

        return (card.nameRU
          ?.toLowerCase()
          .includes(value.toLowerCase()) ||
          card.nameEN
          ?.toLowerCase()
          .includes(value.toLowerCase()));
      });
    }

    return superCards;
  };

 // filteredMovies(superCards);
  return (
    <>
      <Header openBurgerMenu={props.openBurgerMenu} />
      <BurgerMenu isBurgerMenuOpen={props.isBurgerMenuOpen} />
      <SearchForm
        cards={props.cards}
        searchMovies={searchMovies}
        value={value}
        filteredMovies={filteredMovies}
        superCards={superCards}
      />
      <FilterCheckbox
        onVisibleShortsFilm={props.onVisibleShortsFilm}
        onCloseShortsFilm={props.onCloseShortsFilm}
        isChecked={props.isChecked}
      />
      <MoviesCardList
        //   cards={props.cards}
        //   shortsMovies={props.shortsMovies}
        downloadCards={props.downloadCards}
        isChecked={props.isChecked}
        superCards={superCards}
     //   filteredMovies={filteredMovies}
      />
      <Preloader addMovies={props.addMovies} />
      <Footer />
    </>
  );
}

export default Movies;

// filteredMovies(superCards);
/*
  const filteredMovies = (superCards, evt) => {
    evt.preventDefault();
    console.log('ssssss')

    superCards = superFilter(superCards);

    return superCards;

    function superFilter(superCards) {
      return superCards.filter((card) => {
        return (card.nameRU || card.nameEN)
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    }
  };
*/
/*
  const filteredMovies = (superCards) => {
    superCards = superFilter(superCards);

    return superCards;

    function superFilter(superCards) {
      return superCards.filter((card) => {
        return (card.nameRU || card.nameEN)
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    }
  };

  const filteredMovies = (superCards) => {
    superCards = superFilter(superCards);


      return superCards;
    function superFilter(superCards) {


    superCards.filter((card) => {
    return card.nameRU.toLowerCase().includes(value.toLowerCase());
  })};

}

      function superFilter(superCards) {
      return superCards.filter((card) => {
        return (card.nameRU || card.nameEN)
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    }


      const [puperC, setPuperC] = useState([]);


  function filteredMovies(superCards) {
    setPuperC(
     superCards.filter((card) => {
      return card.nameRU.toLowerCase().includes(value.toLowerCase());
    }))
  }
*/
