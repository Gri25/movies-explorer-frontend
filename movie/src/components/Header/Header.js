import React from "react";
import logo from "../../images/logo.svg";
import logoMain from "../../images/icon-main.svg";

function Header() {
  return (
    <header className="header">
      <div className="header__left-info">
        <img src={logo} className="header__logo" alt="Лого" />
        <a href="WWW" className="header__header-link">
          Фильмы
        </a>
        <a href="WWW" className="header__header-link">
          Сохранённые фильмы
        </a>
      </div>
      <div className="header__right-info">
        <p className="header__account-text">Аккаунт</p>
        <div className="header__window-logo">
        <img src={logoMain} className="header__account-logo" alt="Лого" />
        </div>
      </div>
    </header>
  );
}

export default Header;
