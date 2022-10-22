import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import useFormWithValidation from '../../../hooks/useFormWithValidation';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

export default function SearchForm({
  handleSearchSubmit,
  handleShortFilms,
  shortMovies,
}) {
  const currentUser = useContext(CurrentUserContext);
  const location = useLocation();
  const { values, handleChange, isValid, setIsValid } = useFormWithValidation();

  const [errorQuery, setErrorQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    isValid ? handleSearchSubmit(values.search) : setErrorQuery('Нужно ввести ключевое слово.');
  };

  useEffect(() => {
    setErrorQuery('')
  }, [isValid]);

  useEffect(() => {
    if (location.pathname === '/movies' && localStorage.getItem(`${currentUser.email} - movieSearch`)) {
      const searchValue = localStorage.getItem(`${currentUser.email} - movieSearch`);

      values.search = searchValue;
      setIsValid(true);
    }
  }, [currentUser, location.pathname]);

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
