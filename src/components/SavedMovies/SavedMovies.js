import React, { useState, useEffect } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import FilterCheckbox from "../Movies/FilterCheckbox/FilterCheckbox";
import SearchForm from "../Movies/SearchForm/SearchForm";
import SavedMoviesCardList from "./SavedMoviesCardList/SavedMoviesCardList";

function SavedMovies(props) {
  const superSaveCards = (
    props.isChecked ? props.shortsSavedMovies : props.saveCard
  ).concat([]);



  const [value, setValue] = useState("");

  const searchMovies = (value) => {
    setValue(value);
  };

  const filteredMovies = (superSaveCards) => {
    superSaveCards = filtered(superSaveCards);
    function filtered(superSaveCards) {
      return superSaveCards.filter((card) => {
        return (
          card.nameRU?.toLowerCase().includes(value.toLowerCase()) ||
          card.nameEN?.toLowerCase().includes(value.toLowerCase())
        );
      });
    }

    return superSaveCards;
  };

  return (
    <>
      <Header openBurgerMenu={props.openBurgerMenu} />
      <BurgerMenu
        isBurgerMenuOpen={props.isBurgerMenuOpen}
        closeBurgerMenu={props.closeBurgerMenu}
        onLogout={props.onLogout}
        superSaveCards={superSaveCards}
      />
      <SearchForm
        saveCard={props.saveCard}
        searchMovies={searchMovies}
        value={value}
        filteredSavedMovies={filteredMovies}
        superSaveCards={superSaveCards}
      />
      <FilterCheckbox
        onVisibleShortsFilm={props.onVisibleShortsFilm}
        onCloseShortsFilm={props.onCloseShortsFilm}
        isChecked={props.isChecked}
      />
      <SavedMoviesCardList
        saveCard={props.saveCard}
        handleDeleteMovie={props.handleDeleteMovie}
        isChecked={props.isChecked}
        superSaveCards={superSaveCards}
        filteredSavedMovies={filteredMovies(superSaveCards)}
      />
      <Footer />
    </>
  );
}

export default SavedMovies;
