import posterImage1 from '../images/poster1.png';
import posterImage2 from '../images/poster2.png';
import posterImage3 from '../images/poster3.png';
import posterImage4 from '../images/poster4.png';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDuration() {
  const hours = getRandomInt(1, 5);
  const minutes = getRandomInt(0, 29);

  return `${hours}ч ${minutes}м`;
}

const moviesData = [
  {
    _id: '1',
    poster: posterImage1,
    title: 'В погоне за Бенкси-1',
    duration: getRandomDuration(),
    saved: true,
  },

  {
    _id: '2',
    poster: posterImage2,
    title: 'В погоне за Бенкси-2',
    duration: getRandomDuration(),
  },

  {
    _id: '3',
    poster: posterImage3,
    title: 'В погоне за Бенкси-3',
    duration: '1ч 42м',
    saved: true,
  },

  {
    _id: '4',
    poster: posterImage4,
    title: 'В погоне за Бенкси-4',
    duration: '1ч 42м',
    saved: true,
  },

  {
    _id: '5',
    poster: posterImage3,
    title: 'В погоне за Бенкси-5',
    duration: getRandomDuration(),
    saved: true,
  },

  {
    _id: '6',
    poster: posterImage2,
    title: 'В погоне за Бенкси-6',
    duration: getRandomDuration(),
  },

  {
    _id: '7',
    poster: posterImage1,
    title: 'В погоне за Бенкси-7',
    duration: getRandomDuration(),
  },

  {
    _id: '8',
    poster: posterImage4,
    title: 'В погоне за Бенкси-8',
    duration: getRandomDuration(),
  },

  {
    _id: '9',
    poster: posterImage2,
    title: 'В погоне за Бенкси-9',
    duration: getRandomDuration(),
    saved: true,
  },

  {
    _id: '10',
    poster: posterImage1,
    title: 'В погоне за Бенкси-10',
    duration: getRandomDuration(),
  },

  {
    _id: '11',
    poster: posterImage2,
    title: 'В погоне за Бенкси-11',
    duration: getRandomDuration(),
  },

  {
    _id: '12',
    poster: posterImage2,
    title: 'В погоне за Бенкси-12',
    duration: getRandomDuration(),
  },

  {
    _id: '13',
    poster: posterImage4,
    title: 'В погоне за Бенкси-13',
    duration: getRandomDuration(),
  }
];

export default moviesData;
