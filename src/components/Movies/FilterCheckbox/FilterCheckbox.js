import React from "react";

function FilterCheckbox(props) {
  return (
    <section className="filter-checkbox">
      <div className="filter-checkbox__info">
        <button
          type="button"
          onClick={props.onEditFilms}
          onClose={props.onClose}
          className={`filter-checkbox__button ${
            props.isOpen ? "filter-checkbox__button-on" : ""
          }`} // не могу понять как правильно сделать выключение
        />
        <span className="filter-checkbox__text">Короткометражки</span>
      </div>
    </section>
  );
}

export default FilterCheckbox;

// <span className="popup__input-error"></span>
