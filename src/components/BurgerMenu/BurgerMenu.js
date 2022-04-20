import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Preloader from "../Movies/Preloader/Preloader";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/FilterCheckbox/FilterCheckbox";
import ExitBurger from "../../images/exit-burger.svg";
import logoMain from "../../images/icon-main.svg";
import { Link } from "react-router-dom";

function BurgerMenu() {
  return (
    <section>
      <div className="burger-menu-container">
        <div className="burger-menu">
          <img src={ExitBurger} className="burger-menu__exit" alt="Выход" />
          <nav className="burger-menu__links">
            <Link to="/" className="burger-menu__link">
              Главная{" "}
            </Link>
            <Link to="/movies" className="burger-menu__link">
              Фильмы{" "}
            </Link>
            <Link to="/saved-movies" className="burger-menu__link">
              Сохранённые фильмы{" "}
            </Link>
          </nav>
          <Link to="/profile" className="burger-menu__low-info">
            <p className="burger-menu__account-text">Аккаунт</p>
            <div className="burger-menu__window-logo">
              <img
                src={logoMain}
                className="burger-menu__account-logo"
                alt="Лого"
              />
            </div>
          </Link>
        </div>
      </div>
      <Header />
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList />
      <Preloader />
      <Footer />
    </section>
  );
}

export default BurgerMenu;
