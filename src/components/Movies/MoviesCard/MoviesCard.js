import React from "react";
import film from "../../../images/films/33slova.png";
import film1 from "../../../images/films/kinoalmonah.png";
import film2 from "../../../images/films/vpogonezaB.png";
import film3 from "../../../images/films/baskia.png";
import film4 from "../../../images/films/beg.png";
import film5 from "../../../images/films/kniga.png";
import film6 from "../../../images/films/german.png";
import film7 from "../../../images/films/gimme.png";
import film8 from "../../../images/films/jenis.png";
import film9 from "../../../images/films/soberis.png";
import film10 from "../../../images/films/harvi.png";
import film11 from "../../../images/films/volna.png";

function MoviesCard() {
  return (
    <>
      <article className="movie-card">
        <img src={film} className="movie-card__image" alt="Фильм" />
        <div className="movie-card__description">
          <div className="movie-card__info">
            <h2 className="movie-card__text">33 слова о дизайне</h2>
            <p className="movie-card__duration">1ч 47м</p>
          </div>
          <button
            type="button"
            aria-label="Нравится"
            className="movie-card__stroke movie-card__stroke_active"
          ></button>
        </div>
      </article>
      <article className="movie-card">
        <img src={film1} className="movie-card__image" alt="Фильм" />
        <div className="movie-card__description">
          <div className="movie-card__info">
            <h2 className="movie-card__text">Киноальманах «100 лет дизайна»</h2>
            <p className="movie-card__duration">1ч 3м</p>
          </div>
          <button
            type="button"
            aria-label="Нравится"
            className="movie-card__stroke"
          ></button>
        </div>
      </article>
      <article className="movie-card">
        <img src={film2} className="movie-card__image" alt="Фильм" />
        <div className="movie-card__description">
          <div className="movie-card__info">
            <h2 className="movie-card__text">В погоне за Бенкси</h2>
            <p className="movie-card__duration">1ч 42м</p>
          </div>
          <button
            type="button"
            aria-label="Нравится"
            className="movie-card__stroke"
          ></button>
        </div>
      </article>
      <article className="movie-card">
        <img src={film3} className="movie-card__image" alt="Фильм" />
        <div className="movie-card__description">
          <div className="movie-card__info">
            <h2 className="movie-card__text">Баския: Взрыв реальности</h2>
            <p className="movie-card__duration">1ч 21м</p>
          </div>
          <button
            type="button"
            aria-label="Нравится"
            className="movie-card__stroke"
          ></button>
        </div>
      </article>
      <article className="movie-card">
        <img src={film4} className="movie-card__image" alt="Фильм" />
        <div className="movie-card__description">
          <div className="movie-card__info">
            <h2 className="movie-card__text">Бег это свобода</h2>
            <p className="movie-card__duration">1ч 44м</p>
          </div>
          <button
            type="button"
            aria-label="Нравится"
            className="movie-card__stroke"
          ></button>
        </div>
      </article>
      <article className="movie-card">
        <img src={film5} className="movie-card__image" alt="Фильм" />
        <div className="movie-card__description">
          <div className="movie-card__info">
            <h2 className="movie-card__text">Книготорговцы</h2>
            <p className="movie-card__duration">1ч 37м</p>
          </div>
          <button
            type="button"
            aria-label="Нравится"
            className="movie-card__stroke movie-card__stroke_active"
          ></button>
        </div>
      </article>
      <article className="movie-card">
        <img src={film6} className="movie-card__image" alt="Фильм" />
        <div className="movie-card__description">
          <div className="movie-card__info">
            <h2 className="movie-card__text">Когда я думаю о Германии ночью</h2>
            <p className="movie-card__duration">1ч 56м</p>
          </div>
          <button
            type="button"
            aria-label="Нравится"
            className="movie-card__stroke"
          ></button>
        </div>
      </article>
      <article className="movie-card">
        <img src={film7} className="movie-card__image" alt="Фильм" />
        <div className="movie-card__description">
          <div className="movie-card__info">
            <h2 className="movie-card__text">Gimme Danger: История Игги и The Stooge...</h2>
            <p className="movie-card__duration">1ч 59м</p>
          </div>
          <button
            type="button"
            aria-label="Нравится"
            className="movie-card__stroke"
          ></button>
        </div>
      </article>
      <article className="movie-card">
        <img src={film8} className="movie-card__image" alt="Фильм" />
        <div className="movie-card__description">
          <div className="movie-card__info">
            <h2 className="movie-card__text">Дженис: Маленькая девочка грустит</h2>
            <p className="movie-card__duration">1ч 42м</p>
          </div>
          <button
            type="button"
            aria-label="Нравится"
            className="movie-card__stroke movie-card__stroke_active"
          ></button>
        </div>
      </article>
      <article className="movie-card">
        <img src={film9} className="movie-card__image" alt="Фильм" />
        <div className="movie-card__description">
          <div className="movie-card__info">
            <h2 className="movie-card__text">Баския: Взрыв реальности</h2>
            <p className="movie-card__duration">1ч 21м</p>
          </div>
          <button
            type="button"
            aria-label="Нравится"
            className="movie-card__stroke movie-card__stroke_active"
          ></button>
        </div>
      </article>
      <article className="movie-card">
        <img src={film10} className="movie-card__image" alt="Фильм" />
        <div className="movie-card__description">
          <div className="movie-card__info">
            <h2 className="movie-card__text">Соберись перед прыжком</h2>
            <p className="movie-card__duration">1ч 10м</p>
          </div>
          <button
            type="button"
            aria-label="Нравится"
            className="movie-card__stroke"
          ></button>
        </div>
      </article>
      <article className="movie-card">
        <img src={film11} className="movie-card__image" alt="Фильм" />
        <div className="movie-card__description">
          <div className="movie-card__info">
            <h2 className="movie-card__text">По волнам: Искусство звука в кино</h2>
            <p className="movie-card__duration">1ч 7м</p>
          </div>
          <button
            type="button"
            aria-label="Нравится"
            className="movie-card__stroke"
          ></button>
        </div>
      </article>
    </>
  );
}

export default MoviesCard;
