// import './App.css';
//в апп никакой верстки просто импорты и функционал
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import AboutMe from "../Main/AboutMe/AboutMe";
import AboutProject from "../Main/AboutProject/AboutProject";
import Promo from "../Main/Promo/Promo";
import Techs from "../Main/Techs/Techs";
import FilterCheckbox from "../Movies/FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Preloader from "../Movies/Preloader/Preloader";
import SearchForm from "../Movies/SearchForm/SearchForm";

function App() {

  const [isCloseShortsFilms, setIsCloseShortsFilms] = useState(false);

  function handleEditShortsFilms() {
    setIsCloseShortsFilms(true);
  }
  function closeShortsFilms() {
    setIsCloseShortsFilms(false);
  }

  return (
    <>
    <Promo/>
    <AboutProject/>
    <Techs/>
    <AboutMe/>
    <Footer/>
    <Header/>
    <SearchForm/>
    <FilterCheckbox
      isOpen={isCloseShortsFilms}
      onEditFilms={handleEditShortsFilms}
      onClose={closeShortsFilms}
    />
    <MoviesCardList/>
    <Preloader/>
    <Footer/>
    </>
  );
}

export default App;
