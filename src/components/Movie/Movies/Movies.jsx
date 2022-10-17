import './Movies.css';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

export default function Movies({ movies }) {
  return (
    <main className="movies">
      <SearchForm />
      <MoviesCardList movies={movies} />
    </main>
  )
}
