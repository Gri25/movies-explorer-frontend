import React from "react";

function Preloader(props) {
  //<section className={props.buttonYetDisable ? "preloader" : "preloader__none"}>
  return (
    <section className="preloader">
      <button
        type="button"
        onClick={props.addMovies}
        className="preloader__button"
      >
        Ещё
      </button>
    </section>
  );
}

export default Preloader;
