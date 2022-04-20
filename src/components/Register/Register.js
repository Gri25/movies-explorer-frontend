import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Register() {
  return (
    <section className="register">
      <Link to="/" className="register__logo-container">
        <img src={logo} className="register__logo" alt="Лого" />
      </Link>
      <h2 className="register__text">Добро пожаловать!</h2>
      <div className="register__input-section">
        <p className="register__input-text">Имя</p>
        <input className="register__input-info" />
      </div>
      <div className="register__input-section">
        <p className="register__input-text">E-mail</p>
        <input className="register__input-info" />
      </div>
      <div className="register__input-section-red">
        <p className="register__input-text">Пароль</p>
        <input className="register__input-red" type="password" />
      </div>
      <span className="register__input-error">Что-то пошло не так...</span>
      <button className="register__button-reg">Зарегистрироваться</button>
      <div className="register__information">
        <p className="register__question">Уже зарегистрированы?</p>
        <Link to="/signin" className="register__button-log">
          Войти
        </Link>
      </div>
    </section>
  );
}

export default Register;
