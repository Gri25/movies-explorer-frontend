import React, { useState } from "react";
import { useForm } from "react-hook-form";

function SearchForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset
  } = useForm({
    mode: 'onBlur'
  });

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
    reset();
  };

  return (
    <section className="search-form">
      <form className="search-form__form" onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Фильм"
          className="search-form__input"
          {...register("name", {
            required: "Нужно ввести ключевое слово",
            minLength: {
              value: 2,
              message: "Минимум 2 символа",
            },
          })} // возможно нужно будет переделать на RUname
        />
        <button type="submit" className="search-form__button" disabled={!isValid}>
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
