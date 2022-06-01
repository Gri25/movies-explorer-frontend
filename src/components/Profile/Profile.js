import React from "react";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { useFormWithValidation } from "../../utils/formWirthFalidation";

function Profile(props) {
  const { values, handleChange, errors, resetForm, isValid } =
    useFormWithValidation();

  const userData = React.useContext(CurrentUserContext);

  //поле имя
  const [name, setChangeName] = React.useState("");

  const handleChangeName = (event) => {
    handleChange(event);
    setChangeName(event.target.value);
  };
  //поле имейла
  const [email, setChangeEmail] = React.useState("");

  const handleChangeEmail = (event) => {
    handleChange(event);
    setChangeEmail(event.target.value);
  };

  React.useEffect(() => {
    setChangeName(userData.name);
    setChangeEmail(userData.email);
  }, [userData]);

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateUser({
      name,
      email,
    });
    resetForm();
  }

  return (
    <CurrentUserContext.Provider value={userData}>
      <Header openBurgerMenu={props.openBurgerMenu} />
      <BurgerMenu
        closeBurgerMenu={props.closeBurgerMenu}
        onLogout={props.onLogout}
        isBurgerMenuOpen={props.isBurgerMenuOpen}
      />
      <section className="profile">
        <h2 className="profile__text">Привет, {userData.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__input-section">
            <p className="profile__input-text">Имя</p>
            <input
              className="profile__input-info"
              id="name"
              name="name"
              type="string"
              required
              minLength={2}
              maxLength={40}
              //value={userData.name}
              //value={values.name || ""}
              value={name}
              onChange={handleChangeName}
            />
            <span className="profile-input__error">{errors.name}</span>
          </div>
          <div className="profile__input-section">
            <p className="profile__input-text">Почта</p>
            <input
              className="profile__input-info"
              id="email"
              name="email"
              type="email"
              required
              minLength={5}
              maxLength={40}
              //value={userData.email}
              value={email}
              onChange={handleChangeEmail}
            />
            <span className="profile-input__error">{errors.email}</span>
          </div>
          <button
            className={
              isValid
                ? "profile__button-edit"
                : "profile__button-edit__button_invalid"
            }
            type="submit"
            disabled={!isValid}
          >
            Редактировать
          </button>
        </form>
        <button
          onClick={props.onLogout}
          className="profile__button-exit"
          target="blank"
        >
          Выйти из аккаунта
        </button>
      </section>
    </CurrentUserContext.Provider>
  );
}

export default Profile;
