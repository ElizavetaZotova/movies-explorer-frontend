const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000'
    : 'https://api.liza.diplom.nomoredomains.club';
const MOVIES_URL = 'https://api.nomoreparties.co/beatfilm-movies';
const SHORT_MOVIES_DURATION = 40;
const DEVICE_PARAMS = {
  desktop: {
    width: 917,
    cards: {
      total: 12,
      more: 3,
    },
  },
  tablet: {
    width: 583,
    cards: {
      total: 8,
      more: 2,
    },
  },
  mobile: {
    width: 583,
    cards: {
      total: 5,
      more: 2,
    },
  },
};

const SHORT_CHECKBOX_KEY = `movies__short_movies__flag`;
const STORED_MOVIES_KEY = `movies__flag`;
const USER_SEARCH_QUERY_KEY = `movies__search_query__flag`;

export {
  BASE_URL,
  MOVIES_URL,
  SHORT_MOVIES_DURATION,
  DEVICE_PARAMS,
  SHORT_CHECKBOX_KEY,
  STORED_MOVIES_KEY,
  USER_SEARCH_QUERY_KEY,
};
