import React from "react";

function Techs() {
  return (
    <section className="techs">
      <div className="techs__header">
        <h2 className="techs__header-text">Технологии</h2>
      </div>
      <div className="techs__main">
        <h3 className="techs__main-header">7 технологий</h3>
        <p className="techs__main-text">На курсе веб-разработки мы освоили технологии,
          которые применили в дипломном проекте.</p>
      </div>
      <ul className="techs__footer">
        <li className="techs__footer-text">HTML</li>
        <li className="techs__footer-text">CSS</li>
        <li className="techs__footer-text">JS</li>
        <li className="techs__footer-text">React</li>
        <li className="techs__footer-text">Git</li>
        <li className="techs__footer-text">Express.js</li>
        <li className="techs__footer-text">mongoDB</li>
      </ul>
    </section>
  );
}

export default Techs;
