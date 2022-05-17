import React from "react";
import logo from "../../../images/logo.svg";
import imagemini from "../../../images/mini-promo.png";
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
            className="promo__header-link"
          >
            Войти{" "}
          </Link>
        </div>
      </div>
      <h1 className="promo__main">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <img src={image} className="promo__image" alt="Картинка" />
      <img src={imagemini} className="promo__image-mini" alt="Картинка-мини" />
    </section>
  );
}

export default Promo;
