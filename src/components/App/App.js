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
import mainApi from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute";
import * as auth from "../../utils/auth.js";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { getToken } from "../../utils/utils";

function App() {
  const history = useHistory();
  const [currentUser, setcurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const downloadUserData = () => {
    mainApi
      .getPersonalInfo(getToken("token"))
      .then((data) => {
        setcurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleScreenWidth = () => {
    moviesApi
      .getCardMovies()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
/*
  const handleCutLongFilm = () => {
    moviesApi
      .getCardMovies()
      .then((duration) => {
        if (duration) {
          console.log(duration)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
*/
  const [downloadCards, setDownloadCards] = useState(12);
  const [plusCount, setPlusCount] = useState(3);

  function clientWidthMovies() {
    if (document.documentElement.clientWidth < 800) {
      setDownloadCards(8);
      setPlusCount(2);
    }
    if (document.documentElement.clientWidth < 400) {
      setDownloadCards(5);
      setPlusCount(1);
    }
  }

  useEffect(() => {
    downloadUserData();
    clientWidthMovies();
    handleScreenWidth();
    const handleResizeWindow = () => {
      setTimeout(handleScreenWidth, 3000);
    };
    window.addEventListener("resize", handleResizeWindow);
    return () => window.removeEventListener("resize", handleResizeWindow);
  }, []);
  const addMovies = () => {
    setDownloadCards(downloadCards + plusCount);
  };

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
            setcurrentUser(data);
            localStorage.setItem("token", token);
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
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          history.push("/movies");
        }
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
          console.log(data);
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
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <ProtectedRoute
          path="/movies"
          loggedIn={loggedIn}
          component={Movies}
          cards={cards}
          addMovies={addMovies}
          downloadCards={downloadCards}
        >
          {" "}
        </ProtectedRoute>
        <ProtectedRoute
          path="/saved-movies"
          loggedIn={loggedIn}
          component={SavedMovies}
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
    </CurrentUserContext.Provider>
  );
}

export default App;

/*
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
            };
            setUserData(userData);
            localStorage.setItem("token", token);
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  */
