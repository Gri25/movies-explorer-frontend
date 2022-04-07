import React from "react";
import logo from "../../../images/logo.svg";
import image from "../../../images/text__COLOR_landing-logo.png";
import { Link } from "react-router-dom";

function Promo(props) {
  return (
    <section className="promo">
      <div className="promo__header">
        <img src={logo} className="promo__header-logo" alt="Лого" />
        <div className="promo__header-links">
          <a href="WWW" className="promo__header-link">Регистрация</a>
          <a href="WWW" className="promo__header-link promo__header-link_type-active">Войти</a>
        </div>
      </div>
      <h1 className="promo__main">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <img src={image} className="promo__image" alt="Картинка" />
    </section>
  );
}

export default Promo;
/*

        <Link to="/sign-up" className={props ? "promo__header-link" : "promo__header-link_type-active"}>
            Регистрация
          </Link>
          <Link to="/sign-in" className={props ? "promo__header-link" : "promo__header-link_type-active"}>
            Войти
          </Link>
          */
