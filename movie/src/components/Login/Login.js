import React from "react";
import logo from "../../images/logo.svg";

function Login() {
  return (
    <section className="login">
      <img src={logo} className="login__logo" alt="Лого" />
      <h2 className="login__text">Рады видеть!</h2>
      <div className="login__input-section">
        <p className="login__input-text">E-mail</p>
        <input className="login__input-info" />
      </div>
      <div className="login__input-section">
        <p className="login__input-text">Пароль</p>
        <input
          className="login__input-info"
          type="password"
          name="password"
        />
      </div>
      <button className="login__button-reg">Зарегистрироваться</button>
      <div className="login__information">
        <p className="login__question">Ещё не зарегистрированы?</p>
        <a href="WWW" className="login__button-log" target="blank">
          Регистрация
        </a>
      </div>
    </section>
  );
}

export default Login;
