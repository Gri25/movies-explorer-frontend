import React from "react";
import logo from "../../images/logo.svg";
import logoMain from "../../images/icon-main.svg";
import burger from "../../images/header-burger.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header__left-info">
        <Link to="/" className="header__logo-container">
          <img src={logo} className="header__logo" alt="Лого" />
        </Link>
        <Link to="/movies" className="header__header-link">
          Фильмы{" "}
        </Link>
        <Link to="/saved-movies" className="header__header-link">
          Сохранённые фильмы{" "}
        </Link>
      </div>
      <img src={burger} className="header__burger" alt="Меню" onClick={props.openBurgerMenu} />
      <Link to="/profile" className="header__right-info">
        <p className="header__account-text">Аккаунт</p>
        <div className="header__window-logo">
          <img src={logoMain} className="header__account-logo" alt="Лого" />
        </div>
      </Link>
    </header>
  );
}

export default Header;
