import React from "react";
import logo from "../../images/logo.svg";

function Register() {
  return (
    <section className="register">
      <img src={logo} className="register__logo" alt="Лого" />
      <h2 className="register__text">Добро пожаловать!</h2>
      <div className="register__input-section">
        <p className="register__input-text">Имя</p>
        <input className="register__input-info" />
      </div>
      <div className="register__input-section">
        <p className="register__input-text">E-mail</p>
        <input className="register__input-info" />
      </div>
      <div className="register__input-section">
        <p className="register__input-text">Пароль</p>
        <input
          className="register__input-red"
          type="password"
        />
      </div>
      <span className="register__input-error">Что-то пошло не так...</span>
      <button className="register__button-reg">Зарегистрироваться</button>
      <div className="register__information">
        <p className="register__question">Уже зарегистрированы?</p>
        <a href="WWW" className="register__button-log" target="blank">
          Войти
        </a>
      </div>
    </section>
  );
}

export default Register;
