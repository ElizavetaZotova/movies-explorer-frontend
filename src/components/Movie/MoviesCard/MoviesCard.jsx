import { useLocation } from 'react-router-dom';
import { transformDuration } from '../../../utils/utils.js';

import './MoviesCard.css';

export default function MoviesCard({
  movie,
  saved,
  onLikeClick,
  onDeleteClick,
}) {
  const location = useLocation();

  function handleLikeClick() {
    onLikeClick(movie);
  }

  function handleDeleteClick() {
    onDeleteClick(movie);
  }

  return (
    <li className="movies-card">
      <article className="movies-card__item">
        <div className="movies-card__description">
          <h2 className="movies-card__title">{movie.nameRU}</h2>
          <span className="movies-card__duration">
            {transformDuration(movie.duration)}
          </span>
        </div>

        <a target="_blank" rel="noreferrer" href={movie.trailerLink}>
          <img
            src={movie.image}
            alt={movie.nameRU}
            title={`Описание: ${movie.description} \n\nСнято: ${movie.country} ${movie.year}г.`}
            className="movies-card__poster"
          />
        </a>

        {location.pathname === '/movies' && (
          <button
            type="button"
            className={`movies-card__button movies-card__button_type_${
              saved ? 'saved' : 'save'
            }`}
            onClick={saved ? handleDeleteClick : handleLikeClick}
            aria-label={`${
              saved ? 'Удалить фильм из сохранённых' : 'Сохранить фильм'
            }`}
            title={`${
              saved ? 'Удалить фильм из сохранённых' : 'Сохранить фильм'
            }`}
          >
            {saved ? '' : 'Сохранить'}
          </button>
        )}
        {location.pathname === '/saved-movies' && (
          <button
            type="button"
            className="movies-card__button movies-card__button_type_unsave"
            onClick={handleDeleteClick}
            aria-label="Удалить фильм из сохранённых"
            title="Удалить фильм из сохранённых"
          ></button>
        )}
      </article>
    </li>
  );
}
