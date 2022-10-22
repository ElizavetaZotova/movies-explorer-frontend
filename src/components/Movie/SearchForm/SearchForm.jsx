import { useState, useEffect } from 'react';

import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormWithValidation from '../../../hooks/useFormWithValidation';

export default function SearchForm({
  handleSearchSubmit,
  handleShortFilms,
  shortMovies,
}) {
  const { values, handleChange, isValid } = useFormWithValidation();

  const [errorQuery, setErrorQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    isValid ? handleSearchSubmit(values.search) : setErrorQuery('Нужно ввести ключевое слово.');
  };

  useEffect(() => {
    setErrorQuery('')
  }, [isValid]);

  return (
    <section className="search">
      <form className="search__form" name="search" noValidate onSubmit={handleSubmit}>
        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          value={values.search || ''}
          onChange={handleChange}
          required
        />
        <span className="search__error">{errorQuery}</span>
        <button className="search__button" type="submit"></button>
      </form>
      <FilterCheckbox shortMovies={shortMovies} handleShortFilms={handleShortFilms} />
    </section>
  );
}
