import { useState, useContext, useEffect } from 'react';

import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import EmptyList from '../EmptyList/EmptyList';

import {
  transformMovies,
  filterMovies,
  filterShortMovies,
} from '../../../utils/utils.js';
import moviesApi from '../../../utils/MoviesApi.js';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

export default function Movies({
  setIsLoader,
  setIsInfoTooltip,
  savedMoviesList,
  onLikeClick,
  onDeleteClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [shortMovies, setShortMovies] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [notFound, setNotFound] = useState(false);

  function handleSetFilteredMovies(movies, userQuery, shortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userQuery, shortMoviesCheckbox);

    setNotFound(false);

    if (moviesList.length === 0) {
      setNotFound(true);
    }

    setInitialMovies(moviesList);
    setFilteredMovies(
      shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
    );
  }

  function handleSearchSubmit(inputValue) {
    setIsLoader(true);
    moviesApi
      .getMovies()
      .then((movies) => {
        handleSetFilteredMovies(
          transformMovies(movies),
          inputValue,
          shortMovies
        );
      })
      .catch(() =>
        setIsInfoTooltip({
          isOpen: true,
          successful: false,
          text: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
        })
      )
      .finally(() => setIsLoader(false));
  }

  function handleShortFilms() {
    setShortMovies(!shortMovies);

    if (!shortMovies) {
      return setFilteredMovies(filterShortMovies(initialMovies));
    }

    setFilteredMovies(initialMovies);
  }

  useEffect(() => {
    handleSearchSubmit('');
  }, [currentUser]);

  return (
    <main className="movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortMovies={shortMovies}
      />
      {!notFound ? (
        <MoviesCardList
          moviesList={filteredMovies}
          savedMoviesList={savedMoviesList}
          onLikeClick={onLikeClick}
          onDeleteClick={onDeleteClick}
        />
      ) : (
        <EmptyList />
      )}
    </main>
  );
}
