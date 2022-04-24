import React, { useEffect, useState } from "react";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import SavedMovies from "../SavedMovies/SavedMovies";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Movies from "../Movies/Movies";
import Main from "../Main/Main";
import moviesApi from "../../utils/MoviesApi";
import ProtectedRoute from "../ProtectedRoute";
import * as auth from "../../utils/auth.js";

function App() {
  const history = useHistory();

  const [loggedIn, setLoggedIn] = useState(false);
  const [isCloseShortsFilms, setIsCloseShortsFilms] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
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

  useEffect(() => {
    if (loggedIn === true) {
      history.push("/movies");
    }
  }, [loggedIn]);

  useEffect(() => {
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const token = localStorage.getItem("token");
    if (token) {
      // проверим токен
      auth
        .getContent(token)
        .then((data) => {
          if (data) {
            // здесь можем получить данные пользователя!
            const userData = {
              email: data.email,
              //          password: data.data._id,
            };
            localStorage.setItem("token", token);
            setUserData(userData);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleLogin = ({ email, password }) => {
    auth
      .authorize({
        email,
        password,
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
        }
        const userData = {
          email,
        };
        setUserData(userData);
      })
      .catch((error) => console.error(error));
  };

  const handleRegister = ({ email, password, name }) => {
    auth
      .register({ email, password, name })
      .then((data) => {
        if (data) {
          setUserData({
            email,
            password,
            name,
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
          <Login
            onLogin={handleLogin}
            tokenCheck={tokenCheck}
            loggedIn={loggedIn}
          />
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
