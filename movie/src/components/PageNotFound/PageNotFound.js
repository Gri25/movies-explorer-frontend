import React from "react";

function PageNotFound() {
  return (
    <section className="not-found">
      <h2 className="not-found__text">404</h2>
      <p className="not-found__info">Страница не найдена</p>
        <a href="WWW" className="not-found__button" target="blank">
          Назад
        </a>
    </section>
  );
}

export default PageNotFound;
