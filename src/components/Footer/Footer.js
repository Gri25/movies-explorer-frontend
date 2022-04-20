import React from "react";

function Footer() {
  return (
    <section className="footer">
      <div className="footer__header">
        <h2 className="footer__header-text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h2>
      </div>
      <div className="footer__main">
        <p className="footer__main-left-text">&#169; 2022</p>
        <nav className="footer__main-right-text">
          <a
            href="https://practicum.yandex.ru/"
            className="footer__main-right-link"
            target="blank"
          >
            Яндекс.Практикум
          </a>
          <a
            href="https://github.com/"
            className="footer__main-right-link"
            target="blank"
          >
            Github
          </a>
          <a
            href="https://ru-ru.facebook.com/"
            className="footer__main-right-link"
            target="blank"
          >
            Facebook
          </a>
        </nav>
      </div>
    </section>
  );
}

export default Footer;
