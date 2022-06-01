import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../utils/formWirthFalidation";

function Login({ onLogin }) {
  const { values, handleChange, errors, resetForm, isValid } =
    useFormWithValidation();

  const [value, setValue] = React.useState({
    email: "",
    password: "",
  });

  const handleChangeInput = (e) => {
    handleChange(e);
    const { name, value } = e.target
    setValue(v => ({
      ...v,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value.email || !value.password) {
      return;
    }
  //  const { email, password } = data;
    onLogin({email: values['email'], password: values['password']});

    resetForm();
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
            minLength={5}
            maxLength={40}
            id="email"
            value={values.email}
            onChange={handleChangeInput}
            className="login__input-info"
          />
          <span className="login__input__error">{errors.email}</span>
        </div>
        <div className="login__input-section">
          <p className="login__input-text">Пароль</p>
          <input
            className="login__input-info"
            type="password"
            name="password"
            value={values.password}
            required
            minLength={5}
            maxLength={40}
            onChange={handleChangeInput}
            id="password"
          />
          <span className="login__input__error">{errors.password}</span>
        </div>
        <button
          type="submit"
          className={
            isValid ? "login__button-reg" : "login__button-reg__button_invalid"
          }
          disabled={!isValid}
        >
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

/*
function Login({ onLogin, loginError, setLoginError }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  function handleLogin(e) {
    e.preventDefault();
    onLogin({ email: values.email, password: values.password });
    resetForm();
  }

  function handleChangeInput(e) {
    handleChange(e);
    if (loginError.length > 0) {
      setLoginError("");
    }
  }

  return (
    <section className="login">
      <form onSubmit={handleLogin} className="login__section">
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
            value={values.email || ""}
            onChange={handleChangeInput}
            className="login__input-info"
          />
          <span className="login__error">{errors.email}</span>
        </div>
        <div className="login__input-section">
          <p className="login__input-text">Пароль</p>
          <input
            className="login__input-info"
            type="password"
            name="password"
            required
            minLength={2}
            maxLength={25}
            id="password"
            value={values.password || ""}
            onChange={handleChangeInput}
          />
          <span className="login__error">{errors.password}</span>
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
*/
