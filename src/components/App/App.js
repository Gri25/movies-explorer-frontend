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
        data.splice(12, 88);
        if (document.App.clientWidth > 768) {
          data.splice(5, 95);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addMovies = (cards) => {

    cards.splice(15, 85);

  }

  /*
  useEffect(() => {
    const handleScreenWidth = () => {
      ...
    };
    window.addEventListener("resize", handleScreenWidth);
    return () => window.removeEventListener("resize", handleScreenWidth);
  }, [ ]);
*/
  useEffect(() => {
    if (loggedIn === true) {
      history.push("/movies");
      console.log(userData);
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
              name: data.name,
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

  const handleLogin = ({ email, password, name }) => {
    auth
      .authorize({
        email,
        password,
        name,
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          history.push("/movies");
        }
        const userData = {
          email,
          name,
        };
        setUserData(userData);
        console.log(userData);
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
          history.push("/signin");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUserData({
      email: "",
      password: "",
      name: "",
    });
    setLoggedIn(false);
    history.push("/main");
  };

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  function openBurgerMenu() {
    setIsBurgerMenuOpen(true);
  }

  function closeBurgerMenu() {
    setIsBurgerMenuOpen(false);
  }

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
          addMovies={addMovies}
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
        <ProtectedRoute
          path="/profile"
          loggedIn={loggedIn}
          component={Profile}
          onLogout={handleLogout}
          userData={userData}
        >
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
          <BurgerMenu
            isOpen={isBurgerMenuOpen}
            onClose={closeBurgerMenu}
            onLogout={handleLogout}
            userData={userData}
            loggedIn={loggedIn}
          />
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
