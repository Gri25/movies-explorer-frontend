import React from "react";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <section className="profile">
        <h2 className="profile__text">Привет, {props.userData.name}!</h2>
        <div className="profile__input-section">
          <p className="profile__input-text">Имя</p>
          <input className="profile__input-info" value={props.userData.name} />
        </div>
        <div className="profile__input-section">
          <p className="profile__input-text">Почта</p>
          <input className="profile__input-info" value={props.userData.email} />
        </div>
        <button className="profile__button-edit" target="blank">
          Редактировать
        </button>
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
