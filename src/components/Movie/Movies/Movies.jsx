import { useState, useContext, useEffect } from 'react';

import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import EmptyList from '../EmptyList/EmptyList';

import {
  SHORT_CHECKBOX_KEY,
  STORED_MOVIES_KEY,
  USER_SEARCH_QUERY_KEY,
  STORED_FILTERED_MOVIES_KEY,
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
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);

  const [shortMovies, setShortMovies] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [notFound, setNotFound] = useState(false);

  function handleSetFilteredMovies(movies, userQuery, shortMoviesCheckbox) {
    const moviesList = filterMovies(movies, userQuery, shortMoviesCheckbox);

    if (moviesList.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }

    const filteredMovies = shortMoviesCheckbox ? filterShortMovies(moviesList) : moviesList;

    setFilteredMovies(filteredMovies);
    localStorage.setItem(STORED_FILTERED_MOVIES_KEY, JSON.stringify(filteredMovies));
  }

  function handleSearchSubmit(inputValue) {
    localStorage.setItem(USER_SEARCH_QUERY_KEY, inputValue);
    localStorage.setItem(SHORT_CHECKBOX_KEY, shortMovies);

    if (initialMovies.length === 0) {
      setIsLoader(true);
      moviesApi
        .getMovies()
        .then(movies => {
          const transformedMovies = transformMovies(movies);
          setInitialMovies(transformedMovies);
          localStorage.setItem(STORED_MOVIES_KEY, JSON.stringify(transformedMovies));
          handleSetFilteredMovies(
            transformedMovies,
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
      handleSetFilteredMovies(initialMovies, inputValue, shortMovies);
    }
  }

  function handleShortFilms() {
    setShortMovies(!shortMovies);

    handleSetFilteredMovies(
      initialMovies,
      localStorage.getItem(USER_SEARCH_QUERY_KEY) || '',
      !shortMovies
    );
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

      const storedFilteredMovies = localStorage.getItem(STORED_FILTERED_MOVIES_KEY);

      if (storedFilteredMovies) {
        setFilteredMovies(JSON.parse(storedFilteredMovies));
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
        isLoading={isLoading}
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
