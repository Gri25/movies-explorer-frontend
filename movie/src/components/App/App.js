// import './App.css';
//в апп никакой верстки просто импорты и функционал
import React, { useEffect, useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Login from "../Login/Login";
import SearchForm from "../Movies/SearchForm/SearchForm";
import PageNotFound from "../PageNotFound/PageNotFound";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import { Route } from 'react-router-dom';
import Movies from "../Movies/Movies";
import Main from "../Main/Main"

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
      <Main/>
      <Movies
        isOpen={isCloseShortsFilms}
        onEditFilms={handleEditShortsFilms}
        onClose={closeShortsFilms}
      />
      <SavedMovies
        isOpen={isCloseShortsFilms}
        onEditFilms={handleEditShortsFilms}
        onClose={closeShortsFilms}
      />
      <Profile/>
      <Register/>
      <Login/>
      <PageNotFound/>
      <BurgerMenu/>
    </>
  );
}

export default App;
