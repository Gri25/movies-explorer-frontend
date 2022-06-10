import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../utils/formWirthFalidation";

/*
  const [isValid, setIsValid] = React.useState(false);
  const [error, setError] = React.useState("");
  const [isValidButton, setIsValidButton] = React.useState(false);

  if (isValid) {
    setIsValidButton(true);
  }
*/

/*
    if (e.target.validity.valid === false) {
      setIsValid(true);
    } else {
      setError("");
    }
    setError(e.target.validationMessage);
    */

function Register({ onRegister }) {
  const { values, handleChange, errors, resetForm, isValid } =
    useFormWithValidation();

  const [value, setValue] = React.useState({
    name: "",
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

   // const { email, password, name } = data;
    onRegister({email: values['email'], password: values['password'], name: values['name'] });
    resetForm();
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
            // value={data.name}
            value={values.name}
            onChange={handleChangeInput}
            className="register__input-info"
            required
            minLength={2}
            maxLength={40}
          />
          <span className="register-input__error">{errors.name}</span>
        </div>
        <div className="register__input-section">
          <p className="register__input-text">E-mail</p>
          <input
            id="email"
            name="email"
            type="email"
            required
            minLength={5}
            maxLength={40}
            // value={data.email}
            value={values.email}
            onChange={handleChangeInput}
            className="register__input-info"
          />
          <span className="register-input__error">{errors.email}</span>
        </div>
        <div className="register__input-section-red">
          <p className="register__input-text">Пароль</p>
          <input
            id="password"
            name="password"
            type="password"
            // value={data.password}
            value={values.password}
            required
            minLength={5}
            maxLength={40}
            onChange={handleChangeInput}
            className="register__input-red"
          />
          <span className="register-input__error">{errors.password}</span>
        </div>

        <button
          type="submit"
          className={
            isValid
              ? "register__button-reg "
              : "register__button-reg__button_invalid"
          }
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
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

/*
          <span
            className={
              isValid ? "register-input__error" : "register-input__error-none"
            }
          >
            {isValid ? errors : ""}
          </span>
          */

/*
  const [error, setError] = React.useState("");
  const [isValid, setIsValid] = React.useState(false);
   function handleChangeInput(e) {
    handleChange(e);
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    if (e.target.validity.valid === false) {
      setIsValid(true);
    } else {
      setError("");
    }
    setError(e.target.validationMessage);
  }
*/

/*function Register({ onRegister }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
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

  <span className="register__input-error">Ошибка</span>
}

export default Register; */

/*

  const { values, handleChange, errors, resetForm } = useFormWithValidation();

  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

 const [isValid1, setIsValid1] = React.useState(false);
 const [isValid2, setIsValid2] = React.useState(false);
 const [isValid3, setIsValid3] = React.useState(false);
 const [error1, setError1] = React.useState("");
 const [error2, setError2] = React.useState("");
 const [error3, setError3] = React.useState("");
 const [isValidButton, setIsValidButton] = React.useState(false);

  if(isValid1 && isValid2 && isValid3) {
    setIsValidButton(true);
  }

  function handleChangeInput1(e) {
    handleChange(e);
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    if (e.target.validity.valid === false) {
      setIsValid1(true);
    } else {
      setError1("");
    }
    setError1(e.target.validationMessage);
  }

  function handleChangeInput2(e) {
    handleChange(e);
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    if (e.target.validity.valid === false) {
      setIsValid2(true);
    } else {
      setError2("");
    }
    setError2(e.target.validationMessage);
  }

  function handleChangeInput3(e) {
    handleChange(e);
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
    if (e.target.validity.valid === false) {
      setIsValid3(true);
    } else {
      setError3("");
    }
    setError3(e.target.validationMessage);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, name } = data;
    onRegister({ email, password, name });
    resetForm();
  };

*/
