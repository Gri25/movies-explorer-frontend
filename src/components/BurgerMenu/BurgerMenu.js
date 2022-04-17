import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import MoviesCardList from "../Movies/MoviesCardList/MoviesCardList";
import Preloader from "../Movies/Preloader/Preloader";
import SearchForm from "../Movies/SearchForm/SearchForm";
import FilterCheckbox from "../Movies/FilterCheckbox/FilterCheckbox";
import ExitBurger from "../../images/exit-burger.svg";
import logoMain from "../../images/icon-main.svg";

function BurgerMenu() {
  return (
    <>
    <section className="burger-menu-container">
      <div className="burger-menu">
        <img src={ExitBurger} className="burger-menu__exit" alt="Выход" />
        <nav className="burger-menu__links">
          <a href="WWW" className="burger-menu__link">
            Главная
          </a>
          <a href="WWW" className="burger-menu__link burger-menu__link-active">
            Фильмы
          </a>
          <a href="WWW" className="burger-menu__link">
            Сохранённые фильмы
          </a>
        </nav>
        <div className="burger-menu__low-info">
          <p className="burger-menu__account-text">Аккаунт</p>
          <div className="burger-menu__window-logo">
            <img src={logoMain} className="burger-menu__account-logo" alt="Лого" />
          </div>
        </div>
      </div>
      </section>
      <Header />
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList />
      <Preloader />
      <Footer />
    </>
  );
}

export default BurgerMenu;
