import React from "react";
import photo from "../../../images/photo.gif";

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__header">
        <h2 className="about-me__header-text">О проекте</h2>
      </div>
      <div className="about-me__main">
        <div className="about-me__main-left">
          <h3 className="about-me__main-left-name">Григорий</h3>
          <h4 className="about-me__main-left-profession">Фронтенд-разработчик, 26 лет</h4>
          <p className="about-me__main-left-about">Я живу в Санкт-Петербурге,
            закончил химический факультет  УГЛТУ. Я люблю слушать музыку, а
            ещё увлекаюсь бегом. Недавно начал кодить. С 2022 года я безработный.
            Но до этого я работал руководителем на крупном частном производстве.
          </p>
          <nav>
            <a href="https://vk.com/feed" className="about-me__main-left-link" target="blank">
              VKontakte</a>
            <a href="https://github.com/Gri25" className="about-me__main-left-link" target="blank">
              Github</a>
          </nav>
        </div>
        <img src={photo} className="about-me__main-right" alt="Фото" />
      </div>
      <nav className="about-me__portfolio">
        <h3 className="about-me__portfolio-header">Портфолио</h3>
        <div className="about-me__portfolio-block">
          <p className="about-me__portfolio-block-text">Статичный сайт</p>
          <a href="WWW" className="about-me__portfolio-block-link" target="blank">
            ↗</a>
        </div>
        <div className="about-me__portfolio-block">
          <p className="about-me__portfolio-block-text">Адаптивный сайт</p>
          <a href="WWW" className="about-me__portfolio-block-link" target="blank">
            ↗</a>
        </div>
        <div className="about-me__portfolio-block">
          <p className="about-me__portfolio-block-text">Одностраничное приложение</p>
          <a href="WWW" className="about-me__portfolio-block-link" target="blank">
            ↗</a>
        </div>
       </nav>
    </section>
  );
}

export default AboutMe;
