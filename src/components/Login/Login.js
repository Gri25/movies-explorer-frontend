import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [data, setData] = React.useState({
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
    if (!data.email || !data.password) {
      return;
    }
    const { email, password } = data;
    onLogin({ email, password });
  };

  return (
    <section className="login">
      <form onSubmit={handleSubmit} className="login__section">
        <Link to="/" className="login__logo-container">
          <img src={logo} className="login__logo" alt="Лого" />
        </Link>
        <h2 className="login__text">Рады видеть!</h2>
        <div className="login__input-section">
          <p className="login__input-text">E-mail</p>
          <input
            type="email"
            name="email"
            required
            minLength={2}
            maxLength={40}
            id="email"
            value={data.email}
            onChange={handleChange}
            className="login__input-info"
          />
        </div>
        <div className="login__input-section">
          <p className="login__input-text">Пароль</p>
          <input
            className="login__input-info"
            type="password"
            name="password"
            required
            minLength={2}
            maxLength={200}
            id="password"
            value={data.password}
            onChange={handleChange}
          />
        </div>
        <button className="login__button-reg" type="submit">
          Войти
        </button>
      </form>
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
