import React, { useState } from "react";
// import { useForm } from "react-hook-form";

function SearchForm(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.filteredMovies(props.superCards);
  };
  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit}>
        <input
          placeholder="Фильм"
          className="search-form__input"
          onChange={props.searchMovies}
        />
        <button type="submit" className="search-form__button">
          Найти
        </button>
      </form>
      <div className="search-form__error"></div>
    </section>
  );
}

export default SearchForm;

// <span className="search-form-error"></span> пригодится

/*
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function SearchForm(props) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    reset();
  };
  const SSS = (event) => {
    setValue(event.target.value);
  };
  const [value, setValue] = useState('');

  const filteredMovies = props.cards.fiter(card => {
    return card.nameRU.toLowerCase().includes(value.toLowerCase())
  })

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Фильм"
          className="search-form__input"
          onChange={SSS}
          {...register("name", {
            required: "Нужно ввести ключевое слово",
            minLength: {
              value: 2,
              message: "Минимум 2 символа",
            },
          })} // возможно нужно будет переделать на RUname
        />
        <button
          type="submit"
          className="search-form__button"
          disabled={!isValid}
        >
          Найти
        </button>
      </form>
      <div className="search-form__error">
        {errors?.name && <p>{errors?.name?.message || "Error"}</p>}
      </div>
    </section>
  );
}

export default SearchForm;

// <span className="search-form-error"></span> пригодится

*/
