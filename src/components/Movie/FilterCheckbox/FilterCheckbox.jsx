import './FilterCheckbox.css';

export default function FilterCheckbox({ shortMovies, handleShortFilms, isLoading }) {
  return (
    <label className="filter">
      <span className="filter__text">Короткометражки</span>
      <input
        className="filter__checkbox"
        type="checkbox"
        onChange={handleShortFilms}
        checked={shortMovies ? true : false}
        disabled={isLoading}
      />
      <span className="filter__tumbler"></span>
    </label>
  );
}
