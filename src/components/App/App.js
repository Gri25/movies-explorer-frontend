import React, { useEffect, useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "../Movies/Movies";
import Main from "../Main/Main";
import moviesApi from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute";
import * as auth from "../../utils/auth.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isCloseShortsFilms, setIsCloseShortsFilms] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

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
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRegister = ({ name, email, password }) => {
    auth
      .register({ name, email, password })
      .then((data) => {
        if (data) {
          setUserData({
            name,
            email,
            password,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Switch>
        <ProtectedRoute
          userData={userData}
          path="/movies"
          loggedIn={loggedIn}
          component={Movies}
          isOpen={isCloseShortsFilms}
          onEditFilms={handleEditShortsFilms}
          onClose={closeShortsFilms}
          cards={cards}
        >
          {" "}
        </ProtectedRoute>
        <ProtectedRoute
          userData={userData}
          path="/saved-movies"
          loggedIn={loggedIn}
          component={SavedMovies}
          isOpen={isCloseShortsFilms}
          onEditFilms={handleEditShortsFilms}
          onClose={closeShortsFilms}
        >
          {" "}
        </ProtectedRoute>
        <ProtectedRoute path="/profile" loggedIn={loggedIn} component={Profile}>
          {" "}
        </ProtectedRoute>

        <Route path="/main">
          <Main />
        </Route>

        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register onRegister={handleRegister} />
        </Route>
        <Route path="/error">
          <PageNotFound />
        </Route>
        <Route path="/burger">
          <BurgerMenu />
        </Route>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/main" />}
        </Route>
      </Switch>
    </>
  );
}

export default App;

/*
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
          </Route>
          />

                  <Route path="/profile">
          <Profile />
        </Route>
*/
