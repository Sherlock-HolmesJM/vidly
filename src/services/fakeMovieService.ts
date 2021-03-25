import * as genresAPI from './fakeGenreService';

const getID = () => Date.now() + Math.ceil(Math.random() * 1000) + '';

const id1 = getID();
const id2 = getID();
const id3 = getID();
const id4 = getID();
const id5 = getID();
const id6 = getID();
const id7 = getID();
const id8 = getID();
const id9 = getID();

interface Movie {
  _id: string;
  title: string;
  genre: { _id: string; name: string };
  numberInStock: number;
  dailyRentalRate: number;
  publishedDate: string;
  liked: boolean;
}

const movies: Movie[] = [
  {
    _id: id1 + '',
    title: 'Terminator',
    genre: { _id: id1, name: 'Action' },
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
  {
    _id: id2 + '',
    title: 'Die Hard',
    genre: { _id: id2, name: 'Action' },
    numberInStock: 5,
    dailyRentalRate: 2.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
  {
    _id: id3 + '',
    title: 'Get Out',
    genre: { _id: id3, name: 'Thriller' },
    numberInStock: 8,
    dailyRentalRate: 3.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
  {
    _id: id4 + '',
    title: 'Trip to Italy',
    genre: { _id: id4, name: 'Comedy' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishedDate: new Date().toJSON(),
    liked: true,
  },
  {
    _id: id5 + '',
    title: 'Airplane',
    genre: { _id: id5, name: 'Comedy' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
  {
    _id: id6 + '',
    title: 'Wedding Crashers',
    genre: { _id: id6, name: 'Comedy' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
  {
    _id: id7 + '',
    title: 'Gone Girl',
    genre: { _id: id7, name: 'Thriller' },
    numberInStock: 7,
    dailyRentalRate: 4.5,
    publishedDate: new Date().toJSON(),
    liked: true,
  },
  {
    _id: id8 + '',
    title: 'The Sixth Sense',
    genre: { _id: id8, name: 'Thriller' },
    numberInStock: 4,
    dailyRentalRate: 3.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
  {
    _id: id9 + '',
    title: 'The Avengers',
    genre: { _id: id9, name: 'Action' },
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
];

export const getMovies = () => movies;

export const getMovie = (id: string) => movies.find((m) => m._id === id);

export const saveMovie = (movie: Movie) => {
  let movieInDb = movies.find((m) => m._id === movie._id) || ({} as Movie);
  movieInDb.title = movie.title;
  movieInDb.numberInStock = movie.numberInStock;
  movieInDb.dailyRentalRate = movie.dailyRentalRate;
};

export type { Movie };
