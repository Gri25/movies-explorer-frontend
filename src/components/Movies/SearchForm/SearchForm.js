import React from "react";

function SearchForm() {
  return (
    <section className="search-form">
      <form className="search-form__form">
        <input placeholder="Фильм" className="search-form__input" required/>
        <button type="submit" className="search-form__button">
          Найти
        </button>
      </form>
    </section>
  );
}

export default SearchForm;

// <span className="search-form-error"></span> пригодится
