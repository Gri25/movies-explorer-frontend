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
  const [cards, setCards] = useState([]);
  const [shortsMovies, setShortsMovies] = useState([]); //это массив с короткометражками
  const [shortsSavedMovies, setShortsSavedMovies] = useState([]); //это массив с короткометражками сохранёнками
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const [saveCard, setSaveCard] = useState([]);
  const [isChecked, setChecked] = useState(false);
  const [downloadCards, setDownloadCards] = useState(12); //касаемо соответствия расширения и количества карточек
  const [plusCount, setPlusCount] = useState(3); //касаемо соответствия расширения и количества карточек
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const downloadUserData = () => {
    mainApi
      .getPersonalInfo(getToken("token"))
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleScreenWidth = () => {
    moviesApi
      .getCardMovies()
      .then((cards) => {
        setCards(cards); //если что то была data
        setShortsMovies(cards.filter((cards) => cards.duration <= 40));
        console.log(cards);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleVisibleShortsFilm = () => {
    setChecked(true);
  };

  const handleCloseShortsFilm = () => {
    setChecked(false);
  };

  const openBurgerMenu = () => {
    setIsBurgerMenuOpen(true);
  };

  const closeBurgerMenu = () => {
    setIsBurgerMenuOpen(false);
  };

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
    handleSaveCards();
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
            localStorage.setItem("token", token);
            setLoggedIn(true);
            setUserData(data.data);
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
          tokenCheck();
          history.push("/movies");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleRegister = (data) => {
    auth
      .register(data)
      .then((data) => {
        if (data) {
          setUserData(data);
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
    setIsBurgerMenuOpen(false);
  };

  const handleUpdateUser = (data) => {
    mainApi
      .changeUserInfo(data, getToken("token"))
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  console.log(saveCard);

  const handleSaveCards = () => {
    mainApi
      .getSavedCards(getToken("token"))
      .then(({ data }) => {
        setSaveCard(data);
        setShortsSavedMovies(
          saveCard.filter((saveCard) => saveCard.duration <= 40)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const savedCards = (card, id) => {
    if (saveCard.some((savedCard) => savedCard.movieId === card.id)) {
      /*не могу реализовать метод удаления через дизлайк
      силы уже на исходе, может если вы взляните то вам будет понятно как это исправить
      . Я знаю что можно изначально добавить поле для того что бы не писать отдельной функции
      для удаления сохранённых карт через дизлайк но и это у меня не получается.
      */
      mainApi
        .deleteMovie(id, getToken("token"))
        .then(
          setSaveCard(
            setSaveCard((savedCard) =>
              savedCard.filter((savesCard) => savesCard.id !== card.id)
            )
          )
        )
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log(card);
      mainApi
        .savedCard(card, getToken("token"))
        .then(({ data }) => {
          handleSaveCards();
          // setSaveCard([data]);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  /*
  function handleDislikeMovie(id) {
    mainApi
      .deleteMovie(id, getToken("token"))
      .then(
        setSaveCard((savedCard) => savedCard.filter((item) => item.id !== id))
      )
      .catch((error) => {
        console.error(error);
      });
  }
*/

  function handleDeleteMovie(_id) {
    mainApi
      .deleteMovie(_id, getToken("token"))
      .then(
        setSaveCard((savedCard) => savedCard.filter((item) => item._id !== _id))
      )
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <CurrentUserContext.Provider value={userData}>
      <Switch>
        <ProtectedRoute
          path="/movies"
          isBurgerMenuOpen={isBurgerMenuOpen}
          loggedIn={loggedIn}
          component={Movies}
          cards={cards}
          shortsMovies={shortsMovies}
          addMovies={addMovies}
          downloadCards={downloadCards}
          onVisibleShortsFilm={handleVisibleShortsFilm}
          onCloseShortsFilm={handleCloseShortsFilm}
          isChecked={isChecked}
          openBurgerMenu={openBurgerMenu}
          closeBurgerMenu={closeBurgerMenu}
          savedCards={savedCards}
          saveCard={saveCard}
          onLogout={handleLogout}
          handleDeleteMovie={handleDeleteMovie}
          //          handleDislikeMovie={handleDislikeMovie}
          // isStrokeAktive={isStrokeAktive}
        >
          {" "}
        </ProtectedRoute>

        <ProtectedRoute
          path="/saved-movies"
          loggedIn={loggedIn}
          component={SavedMovies}
          saveCard={saveCard}
          shortsSavedMovies={shortsSavedMovies}
          isBurgerMenuOpen={isBurgerMenuOpen}
          openBurgerMenu={openBurgerMenu}
          closeBurgerMenu={closeBurgerMenu}
          onLogout={handleLogout}
          handleDeleteMovie={handleDeleteMovie}
          onVisibleShortsFilm={handleVisibleShortsFilm}
          onCloseShortsFilm={handleCloseShortsFilm}
          isChecked={isChecked}
        >
          {" "}
        </ProtectedRoute>

        <ProtectedRoute
          path="/profile"
          loggedIn={loggedIn}
          component={Profile}
          onLogout={handleLogout}
          // userData={userData}
          onUpdateUser={handleUpdateUser}
          openBurgerMenu={openBurgerMenu}
          closeBurgerMenu={closeBurgerMenu}
          isBurgerMenuOpen={isBurgerMenuOpen}
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

        <Route exact path="/">
          {loggedIn ? <Redirect to="/movies" /> : <Redirect to="/main" />}
        </Route>
      </Switch>
    </CurrentUserContext.Provider>
  );
}

export default App;
