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

  /*хедер нужно вынести отдель и сделать так чтобы он переключался
между двумя вариантами зависимов от laggedIn*/
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
*/
