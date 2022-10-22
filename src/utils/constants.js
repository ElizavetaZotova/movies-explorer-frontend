const BASE_URL = process.env.NODE_ENV === 'development'
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

export { BASE_URL, MOVIES_URL, SHORT_MOVIES_DURATION, DEVICE_PARAMS };
