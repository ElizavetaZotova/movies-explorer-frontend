import { useState, useEffect } from 'react';

import { filterMovies, filterShortMovies } from '../../../utils/utils.js';

import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import EmptyList from '../EmptyList/EmptyList';

export default function SavedMovies({
  onDeleteClick,
  savedMoviesList,
}) {
  const [shortMovies, setShortMovies] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [showedMovies, setShowedMovies] = useState(savedMoviesList);
  const [filteredMovies, setFilteredMovies] = useState(showedMovies);

  function handleSearchSubmit(inputValue) {
    const moviesList = filterMovies(savedMoviesList, inputValue, shortMovies);

    if (moviesList.length === 0) {
      setNotFound(true);
    } else {
      setNotFound(false);
      setFilteredMovies(moviesList);
      setShowedMovies(moviesList);
    }
  }

  function handleShortFilms() {
    if (!shortMovies) {
      setShortMovies(true);
      setShowedMovies(filterShortMovies(filteredMovies));
      filterShortMovies(filteredMovies).length === 0
        ? setNotFound(true)
        : setNotFound(false);
    } else {
      setShortMovies(true);
      filteredMovies.length === 0 ? setNotFound(true) : setNotFound(false);
      setShowedMovies(filteredMovies);
    }
  }

  useEffect(() => {
    handleSearchSubmit('');
    savedMoviesList.length !== 0 ? setNotFound(false) : setNotFound(true);
  }, [savedMoviesList]);

  return (
    <main className="saved-movies">
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        handleShortFilms={handleShortFilms}
        shortMovies={shortMovies}
      />
      {!notFound ? (
        <MoviesCardList
          moviesList={showedMovies}
          savedMoviesList={savedMoviesList}
          onDeleteClick={onDeleteClick}
        />
      ) : (
        <EmptyList />
      )}
    </main>
  );
}
