import { getGenreID } from './fakeGenreService';

const getID = () => Date.now() + Math.ceil(Math.random() * 1000) + '';

export interface Movie {
  _id: string;
  title: string;
  genre: { _id?: string; name: string };
  numberInStock: number;
  dailyRentalRate: number;
  publishedDate: string;
  liked: boolean;
}

const movies: Movie[] = [
  {
    _id: getID() + '',
    title: 'Terminator',
    genre: { _id: getGenreID('Action'), name: 'Action' },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
  {
    _id: getID() + '',
    title: 'Die Hard',
    genre: { _id: getGenreID('Action'), name: 'Action' },
    numberInStock: 5,
    dailyRentalRate: 2.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
  {
    _id: getID() + '',
    title: 'Get Out',
    genre: { _id: getGenreID('Thriller'), name: 'Thriller' },
    numberInStock: 8,
    dailyRentalRate: 3.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
  {
    _id: getID() + '',
    title: 'Trip to Italy',
    genre: { _id: getGenreID('Comedy'), name: 'Comedy' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishedDate: new Date().toJSON(),
    liked: true,
  },
  {
    _id: getID() + '',
    title: 'Airplane',
    genre: { _id: getGenreID('Comedy'), name: 'Comedy' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
  {
    _id: getID() + '',
    title: 'Wedding Crashers',
    genre: { _id: getGenreID('Comedy'), name: 'Comedy' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
  {
    _id: getID() + '',
    title: 'Gone Girl',
    genre: { _id: getGenreID('Thriller'), name: 'Thriller' },
    numberInStock: 7,
    dailyRentalRate: 4.5,
    publishedDate: new Date().toJSON(),
    liked: true,
  },
  {
    _id: getID() + '',
    title: 'The Sixth Sense',
    genre: { _id: getGenreID('Thriller'), name: 'Thriller' },
    numberInStock: 4,
    dailyRentalRate: 3.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
  {
    _id: getID() + '',
    title: 'The Avengers',
    genre: { _id: getGenreID('Action'), name: 'Action' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
];

export const getMovies = (genre: string) => {
  return genre === 'All Genres'
    ? [...movies]
    : movies.filter((m) => m.genre.name === genre);
};

export const getMovie = (id: string) => movies.find((m) => m._id === id);

export const saveMovie = (movie: Movie) => {
  let movieInDb = movies.find((m) => m._id === movie._id) || ({} as Movie);
  movieInDb.title = movie.title;
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;
};
