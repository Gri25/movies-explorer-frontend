import React from "react";

function FilterCheckbox(props) {
  return (
    <section className="filter-checkbox">
      <div className="filter-checkbox__case">
        <label className="filter-checkbox__info">
          <input type="checkbox" className="filter-checkbox__checkbox" />
          <span className="filter-checkbox__fake"></span>
          <span className="filter-checkbox__text">Короткометражки</span>
        </label>
      </div>
    </section>
  );
}

export default FilterCheckbox;
