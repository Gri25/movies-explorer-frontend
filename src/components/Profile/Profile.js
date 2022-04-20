import React from "react";
import Header from "../Header/Header";

function Profile() {
  return (
    <>
    <Header/>
    <section className="profile">
      <h2 className="profile__text">Привет, Виталий!</h2>
      <div className="profile__input-section">
        <p className="profile__input-text">Имя</p>
        <input className="profile__input-info" value="Виталий"/>
      </div>
      <div className="profile__input-section">
        <p className="profile__input-text">E-mail</p>
        <input className="profile__input-info" value="pochta@yandex.ru"/>
      </div>
      <a href="WWW" className="profile__button-edit" target="blank">
        Редактировать
      </a>
      <a href="WWW" className="profile__button-exit" target="blank">
        Выйти из аккаунта
      </a>
    </section>
    </>
  );
}

export default Profile;
