import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //  if (data.password) {
    //если что сотри это условие!!!!!!
    const { email, password, name } = data;
    onRegister({ email, password, name });
  };

  return (
    <section className="register">
      <Link to="/" className="register__logo-container">
        <img src={logo} className="register__logo" alt="Лого" />
      </Link>
      <h2 className="register__text">Добро пожаловать!</h2>
      <form onSubmit={handleSubmit} className="register__form-section">
      <div className="register__input-section">
        <p className="register__input-text">Имя</p>
        <input
          id="name"
          name="name"
          type="string"
          value={data.name}
          onChange={handleChange}
          className="register__input-info"
        />
      </div>
      <div className="register__input-section">
        <p className="register__input-text">E-mail</p>
        <input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          className="register__input-info"
        />
      </div>
      <div className="register__input-section-red">
        <p className="register__input-text">Пароль</p>
        <input
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          className="register__input-red"
        />
      </div>
      <span className="register__input-error">Что-то пошло не так...</span>
      <button type="submit" className="register__button-reg">Зарегистрироваться</button>
      </form>
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
