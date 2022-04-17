import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Login() {
  return (
    <section className="login">
      <Link to="/" className="login__logo-container">
        <img src={logo} className="login__logo" alt="Лого" />
      </Link>
      <h2 className="login__text">Рады видеть!</h2>
      <div className="login__input-section">
        <p className="login__input-text">E-mail</p>
        <input className="login__input-info" />
      </div>
      <div className="login__input-section">
        <p className="login__input-text">Пароль</p>
        <input className="login__input-info" type="password" name="password" />
      </div>
      <button className="login__button-reg">Войти</button>
      <div className="login__information">
        <p className="login__question">Ещё не зарегистрированы?</p>
        <Link to="/signup" className="login__button-log">
          Регистрация
        </Link>
      </div>
    </section>
  );
}

export default Login;
