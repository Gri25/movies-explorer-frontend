import React, { useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import FilterCheckbox from "./FilterCheckbox/FilterCheckbox";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import Preloader from "./Preloader/Preloader";
import SearchForm from "./SearchForm/SearchForm";

function Movies(props) {
  const superCards = (
    props.isChecked ? props.shortsMovies : props.cards
  ).concat([]);

  const [value, setValue] = useState("");

  const searchMovies = (value) => {
    setValue(value);
  };

  const filteredMovies = (superCards) => {
    superCards = filtered(superCards);
    function filtered(superCards) {
      return superCards.filter((card) => {
        return (
          card.nameRU?.toLowerCase().includes(value.toLowerCase()) ||
          card.nameEN?.toLowerCase().includes(value.toLowerCase())
        );
      });
    }

    return superCards;
  };

  return (
    <>
      <Header openBurgerMenu={props.openBurgerMenu} loggedIn={props.loggedIn} />
      <BurgerMenu
        isBurgerMenuOpen={props.isBurgerMenuOpen}
        closeBurgerMenu={props.closeBurgerMenu}
        onLogout={props.onLogout}
      />
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
        downloadCards={props.downloadCards}
        isChecked={props.isChecked}
        saveCard={props.saveCard}
        superCards={superCards}
        filteredMovies={filteredMovies(superCards)}
        savedCards={props.savedCards}
        handleDeleteMovie={props.handleDeleteMovie}
        handleSaveCards={props.handleSaveCards}
      />
      <Preloader
        addMovies={props.addMovies}
        buttonYetDisable={props.buttonYetDisable}
      />
      <Footer />
    </>
  );
}

export default Movies;
