import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormWithValidation from '../../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { USER_SEARCH_QUERY_KEY } from '../../../utils/constants';

export default function SearchForm({
  handleSearchSubmit,
  handleShortFilms,
  shortMovies,
  isLoading
}) {
  const currentUser = useContext(CurrentUserContext);

  const location = useLocation();
  const { values, handleChange, isValid, setIsValid } = useFormWithValidation();

  const [errorQuery, setErrorQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    isValid
      ? handleSearchSubmit(values.search)
      : setErrorQuery('Нужно ввести ключевое слово.');
  }

  useEffect(() => {
    setErrorQuery('');
  }, [isValid]);

  useEffect(() => {
    if (
      location.pathname === '/movies' &&
      localStorage.getItem(USER_SEARCH_QUERY_KEY)
    ) {
      const searchValue = localStorage.getItem(USER_SEARCH_QUERY_KEY);
      values.search = searchValue;
      setIsValid(true);
    }
  }, [currentUser]);

  return (
    <section className="search">
      <form
        className="search__form"
        name="search"
        noValidate
        onSubmit={handleSubmit}
      >
        <input
          className="search__input"
          name="search"
          type="text"
          placeholder="Фильм"
          value={values.search || ''}
          onChange={handleChange}
          disabled={isLoading}
        />
        <span className="search__error">{errorQuery}</span>
        <button className="search__button" type="submit" disabled={isLoading}></button>
      </form>
      <FilterCheckbox
        shortMovies={shortMovies}
        handleShortFilms={handleShortFilms}
        isLoading={isLoading}
      />
    </section>
  );
}
