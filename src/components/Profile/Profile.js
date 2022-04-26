import React from "react";
import Header from "../Header/Header";

function Profile(props) {
  return (
    <>
    <Header/>
    <section className="profile">
      <h2 className="profile__text">Привет, {props.userData.name}!</h2>
      <div className="profile__input-section">
        <p className="profile__input-text">Имя</p>
        <input className="profile__input-info" value={props.userData.name}/>
      </div>
      <div className="profile__input-section">
        <p className="profile__input-text">Почта</p>
        <input className="profile__input-info" value={props.userData.email}/>
      </div>
      <button className="profile__button-edit" target="blank">
        Редактировать
      </button>
      <button onClick={props.onLogout} className="profile__button-exit" target="blank">
        Выйти из аккаунта
      </button>
    </section>
    </>
  );
}

export default Profile;
