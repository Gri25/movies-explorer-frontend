import React from "react";
import Header from "../Header/Header";
import { CurrentUserContext } from "../../context/CurrentUserContext";

function Profile(props) {
  const userData = React.useContext(CurrentUserContext);

  //поле имя
  const [name, setChangeName] = React.useState("");

  const handleChangeName = (event) => {
    setChangeName(event.target.value);
  };
  //поле деятельности
  const [email, setChangeEmail] = React.useState("");

  const handleChangeEmail = (event) => {
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
  }
  return (
    <CurrentUserContext.Provider value={userData}>
      <Header />
      <section className="profile">
        <h2 className="profile__text">Привет, {userData.name}!</h2>
        <form className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__input-section">
            <p className="profile__input-text">Имя</p>
            <input
              className="profile__input-info"
              type="text"
              name="name"
              required
              minLength={2}
              maxLength={40}
              //value={userData.name}
              value={name || ""}
              onChange={handleChangeName}
            />
          </div>
          <div className="profile__input-section">
            <p className="profile__input-text">Почта</p>
            <input
              className="profile__input-info"
              type="text"
              name="email"
              required
              minLength={2}
              maxLength={40}
              //value={userData.email}
              value={email}
              onChange={handleChangeEmail}
            />
          </div>
          <button className="profile__button-edit" type="submit">
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
