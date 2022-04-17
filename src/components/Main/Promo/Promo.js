import React from "react";
import logo from "../../../images/logo.svg";
import image from "../../../images/text__COLOR_landing-logo.png";
import { Link } from "react-router-dom";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__header">
        <Link to="/" className="promo__header-logo-container">
          <img src={logo} className="promo__header-logo" alt="Лого" />
        </Link>
        <div className="promo__header-links">
          <Link to="/signup" className="promo__header-link">
            Регистрация
          </Link>
          <Link
            to="/signin"
            className="promo__header-link promo__header-link_type-active"
          >
            Войти{" "}
          </Link>
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
