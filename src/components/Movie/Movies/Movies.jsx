import { useState, useContext, useEffect } from 'react';

import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import EmptyList from '../EmptyList/EmptyList';

import {
  SHORT_CHECKBOX_KEY,
  STORED_MOVIES_KEY,
  USER_SEARCH_QUERY_KEY,
} from '../../../utils/constants';

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
  const [isAllMovies, setIsAllMovies] = useState([]);

  function handleSetFilteredMovies(movies, userQuery, shortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userQuery, shortMoviesCheckbox);

    if (moviesList.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }

    setInitialMovies(moviesList);
    setFilteredMovies(
      shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList
    );
    localStorage.setItem(
      STORED_MOVIES_KEY,
      JSON.stringify(moviesList)
    );
  }

  function handleSearchSubmit(inputValue) {
    localStorage.setItem(USER_SEARCH_QUERY_KEY, inputValue);
    localStorage.setItem(SHORT_CHECKBOX_KEY, shortMovies);

    if (isAllMovies.length === 0) {
      setIsLoader(true);
      moviesApi
        .getMovies()
        .then(movies => {
          setIsAllMovies(movies);
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
    } else {
      handleSetFilteredMovies(isAllMovies, inputValue, shortMovies);
    }
  }

  function handleShortFilms() {
    setShortMovies(!shortMovies);
    if (!shortMovies) {
      setFilteredMovies(filterShortMovies(initialMovies));
    } else {
      setFilteredMovies(initialMovies);
    }
    localStorage.setItem(SHORT_CHECKBOX_KEY, !shortMovies);
  }

  useEffect(() => {
    if (localStorage.getItem(SHORT_CHECKBOX_KEY) === 'true') {
      setShortMovies(true);
    } else {
      setShortMovies(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (localStorage.getItem(STORED_MOVIES_KEY)) {
      const movies = JSON.parse(
        localStorage.getItem(STORED_MOVIES_KEY)
      );
      setInitialMovies(movies);

      if (
        localStorage.getItem(SHORT_CHECKBOX_KEY) === 'true'
      ) {
        setFilteredMovies(filterShortMovies(movies));
      } else {
        setFilteredMovies(movies);
      }
    } else {
      handleSearchSubmit('');
    }
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
