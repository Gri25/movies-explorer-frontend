import React, { useEffect, useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import { Route, Switch } from "react-router-dom";
import Movies from "../Movies/Movies";
import Main from "../Main/Main";
import moviesApi from "../../utils/MoviesApi"

function App() {
  const [isCloseShortsFilms, setIsCloseShortsFilms] = useState(false);

  function handleEditShortsFilms() {
    setIsCloseShortsFilms(true);
  }
  function closeShortsFilms() {
    setIsCloseShortsFilms(false);
  }

  const [cards, setCards] = useState([]);

  useEffect(() => {
    moviesApi
    .getCardMovies()
      .then((data) => {
        setCards(data);
        console.log(data)
      })
      .catch((err) => {
        console.log(err);
      });
    }
    , []);

  return (
    <>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/movies">
          <Movies
            isOpen={isCloseShortsFilms}
            onEditFilms={handleEditShortsFilms}
            onClose={closeShortsFilms}
            cards={cards}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies
            isOpen={isCloseShortsFilms}
            onEditFilms={handleEditShortsFilms}
            onClose={closeShortsFilms}
          />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/error">
          <PageNotFound />
        </Route>
        <Route path="/burger">
          <BurgerMenu />
        </Route>
      </Switch>
    </>
  );
}

export default App;
