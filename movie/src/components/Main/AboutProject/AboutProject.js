import React from "react";
// import logo from "../images/Vector.svg";
//import { Link, useLocation } from "react-router-dom";

function AboutProject() {
  return (
    <section className="about-project">
      <div className="about-project__header">
        <h2 className="about-project__header-text">О проекте</h2>
      </div>
      <div className="about-project__main">
        <div className="about-project__main-left">
          <h3 className="about-project__main-left-header">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__main-left-text">Составление плана, работу над бэкендом, вёрстку,
            добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__main-right">
          <h3 className="about-project__main-right-header">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__main-right-text">У каждого этапа был мягкий и жёсткий дедлайн,
            которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__footer">
        <div className="about-project__footer-block">
         <span className="about-project__footer-block-left">1 неделя</span>
         <span className="about-project__footer-block-right">4 недели</span>
       </div>
        <div className="about-project__footer-under">
          <span className="about-project__footer-under-left">Back-end</span>
          <span className="about-project__footer-under-right">Front-end</span>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
