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

  // const [saved, setSaved] = useState(false);

  const handleScreenWidth = () => {
    moviesApi
      .getCardMovies()
      .then((cards) => {
        setCards(cards); //если что то была data
        setShortsMovies(cards.filter((cards) => cards.duration <= 40));
        console.log(cards);

        if (cards.id === saveCard.movieId) {
          //  cards.push(saveCard._id);
          // setSaved(true);
          // cards.map((saveCard) => push(saveCard._id));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(cards);
  // const [moviesCards, setMoviesCards] = useState([]);

  const [isChecked, setChecked] = useState(false);

  const handleVisibleShortsFilm = () => {
    setChecked(true);
  };

  const handleCloseShortsFilm = () => {
    setChecked(false);
  };

  //касаемо соответствия расширения и количества карточек
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
    handleSaveCards();
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

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const openBurgerMenu = () => {
    setIsBurgerMenuOpen(true);
  };

  const closeBurgerMenu = () => {
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
        setShortsSavedMovies(saveCard.filter((saveCard) => saveCard.duration <= 40));
        //    setShortsMovies(cards.filter((cards) => cards.duration <= 40));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const [isStrokeAktive, setIsStrokeAktive] = React.useState(false);

  const savedCards = (card) => {
    // console.log(JSON.stringify(card));
    if (saveCard.some((savedCard) => savedCard.movieId === card.id)) {
      handleDeleteMovie(card.id);
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

  function handleDeleteMovie(movieId) {
    mainApi
      .deleteMovie(movieId, getToken("token"))
      .then(() => {
        setSaveCard((savedCard) => savedCard.filter((item) => item._id !== movieId));
      })
      /*
      .then(

        () => {
          setSaveCard((card) =>
        //  (savedCard) => savedCard.movieId === card.id)
        saveCard.filter((saveItem) => saveItem.movieId === card.id)
          );
        }

      )
      */
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
            setUserData(data);
            localStorage.setItem("token", token);
            setLoggedIn(true);
            const userData = {
              name: data.name,
              email: data.email,
            };
            setUserData(userData);
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
     //     const userData = {
     //       name: data.name,
     //       email: data.email,
     //     };
      //    setUserData(userData);
          setLoggedIn(true);
          console.log(userData);
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


          <Route path="/burger">
          <BurgerMenu
            onClose={closeBurgerMenu}
            onLogout={handleLogout}
            userData={userData}
            loggedIn={loggedIn}
          />
        </Route>




          const handleRegister = ({ email, name, password }) => {
    auth
      .register({ email, name, password })
      .then((data) => {
        if (data) {
          setUserData({
            email,
            name,
            password,
          });
          history.push("/signin");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /*
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });



  /*
  function savedCards(card) {
    mainApi
      .savedCard(card, getToken("token"))
      .then((res) => {
        const movies = [...saveCard, res];
        localStorage.setItem("savedMovies", JSON.stringify(movies));
        setSaveCard((prev) => [...prev, res]);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  */
/*


  function savedCards(card) {
    mainApi.saveMovie({ token, card })
        .then((res) => {
            const movies = [...savedMoviesCollection, res];
            localStorage.setItem('savedMovies', JSON.stringify(movies));
            setSavedMoviesCollection(prev => [...prev, res]);

        }).catch((err) => setServerError(true))
    }
*/
/*хедер нужно вынести отдель и сделать так чтобы он переключался
между двумя вариантами зависимов от laggedIn*/

/*import React, { useEffect, useState } from "react";
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

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
  //console.log(cards);

  const handleScreenWidth = () => {
    moviesApi
      .getCardMovies()
      .then((cards) => {
        setCards(cards); //если что то была data
        setShortsMovies(cards.filter((cards) => cards.duration <= 40));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // console.log(cards);
  // const [moviesCards, setMoviesCards] = useState([]);

  const [isChecked, setChecked] = useState(false);

  const handleVisibleShortsFilm = () => {
    setChecked(true);
  };

  const handleCloseShortsFilm = () => {
    setChecked(false);
  };

  //касаемо соответствия расширения и количества карточек
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
  };

  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const openBurgerMenu = () => {
    setIsBurgerMenuOpen(true);
  };

  const closeBurgerMenu = () => {
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

  const [saveCard, setSaveCard] = useState([]);

  function savedCards(card) {

    mainApi
      .savedCard(card, getToken("token"))
      .then((res) => {
        setSaveCard([res, ...saveCard]);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const [loginError, setLoginError] = React.useState("");
  const [registerError, setRegisterError] = React.useState("");
  const [foundError, setFoundError] = React.useState(false);
  const [serverError, setServerError] = React.useState(false);
  const [profileError, setProfileError] = React.useState("");

  function clearAllErrors() {
    setLoginError("");
    setRegisterError("");
    setFoundError(false);
    setServerError(false);
    setProfileError("");
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
          savedCards={savedCards}
          saveCard={saveCard}
        >
          {" "}
        </ProtectedRoute>

        <ProtectedRoute
          path="/saved-movies"
          loggedIn={loggedIn}
          component={SavedMovies}
          saveCard={saveCard}
        >
          {" "}
        </ProtectedRoute>

        <ProtectedRoute
          path="/profile"
          loggedIn={loggedIn}
          component={Profile}
          onLogout={handleLogout}
          userData={userData}
          onUpdateUser={handleUpdateUser}
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
            clearErrors={clearAllErrors}
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
            setUserData(data);
            localStorage.setItem("token", token);
            setLoggedIn(true);
            const userData = {
              name: data.name,
              email: data.email,
            };
            setUserData(userData);
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
     //     const userData = {
     //       name: data.name,
     //       email: data.email,
     //     };
      //    setUserData(userData);
          setLoggedIn(true);
          console.log(userData);
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


          <Route path="/burger">
          <BurgerMenu
            onClose={closeBurgerMenu}
            onLogout={handleLogout}
            userData={userData}
            loggedIn={loggedIn}
          />
        </Route>




          const handleRegister = ({ email, name, password }) => {
    auth
      .register({ email, name, password })
      .then((data) => {
        if (data) {
          setUserData({
            email,
            name,
            password,
          });
          history.push("/signin");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  /*
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });



  /*
  function savedCards(card) {
    mainApi
      .savedCard(card, getToken("token"))
      .then((res) => {
        const movies = [...saveCard, res];
        localStorage.setItem("savedMovies", JSON.stringify(movies));
        setSaveCard((prev) => [...prev, res]);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  */
/*


  function savedCards(card) {
    mainApi.saveMovie({ token, card })
        .then((res) => {
            const movies = [...savedMoviesCollection, res];
            localStorage.setItem('savedMovies', JSON.stringify(movies));
            setSavedMoviesCollection(prev => [...prev, res]);

        }).catch((err) => setServerError(true))
    }
*/
/*хедер нужно вынести отдель и сделать так чтобы он переключался
между двумя вариантами зависимов от laggedIn*/
