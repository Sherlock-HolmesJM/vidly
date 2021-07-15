import { getGenre } from "./fakeGenreService";

const getID = () => Date.now() + Math.ceil(Math.random() * 1000) + "";

export interface Movie {
  _id: string;
  title: string;
  genre: { _id?: string; name: string };
  numberInStock: number;
  dailyRentalRate: number;
  publishedDate: string;
  liked: boolean;
}

let movies: Movie[] = [
  {
    _id: "1626302193654a",
    title: "Terminator",
    genre: getGenre("Action"),
    numberInStock: 6,
    dailyRentalRate: 2.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
  {
    _id: "1626302193654b",
    title: "Die Hard",
    genre: getGenre("Action"),
    numberInStock: 5,
    dailyRentalRate: 2.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
  {
    _id: "1626302193654c",
    title: "Get Out",
    genre: getGenre("Thriller"),
    numberInStock: 8,
    dailyRentalRate: 3.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
  {
    _id: "1626302193654d",
    title: "Trip to Italy",
    genre: getGenre("Comedy"),
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishedDate: new Date().toJSON(),
    liked: true,
  },
  {
    _id: "1626302193654e",
    title: "Airplane",
    genre: getGenre("Comedy"),
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
  {
    _id: "1626302193654f",
    title: "Wedding Crashers",
    genre: getGenre("Comedy"),
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
  {
    _id: "1626302193654g",
    title: "Gone Girl",
    genre: getGenre("Thriller"),
    numberInStock: 7,
    dailyRentalRate: 4.5,
    publishedDate: new Date().toJSON(),
    liked: true,
  },
  {
    _id: "1626302193654h",
    title: "The Sixth Sense",
    genre: getGenre("Thriller"),
    numberInStock: 4,
    dailyRentalRate: 3.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
  {
    _id: "1626302193654i",
    title: "The Avengers",
    genre: getGenre("Action"),
    numberInStock: 7,
    dailyRentalRate: 3.5,
    publishedDate: new Date().toJSON(),
    liked: false,
  },
];

export const getMovies = (genre?: string) => {
  return genre ? movies.filter((m) => m.genre.name === genre) : [...movies];
};

export const deleteMovie = (movie: Movie) => {
  movies = movies.filter((m) => m._id !== movie._id);
  return [...movies];
};

export const getMovie = (id: string) => movies.find((m) => m._id === id);

export const saveMovie = (movie: Movie) => {
  const movieInDb = movies.find((m) => m.title === movie.title);

  if (movieInDb) {
    const index = movies.indexOf(movieInDb);
    movies[index] = { ...movieInDb, ...movie };
  } else {
    movies.push({
      ...movie,
      liked: false,
      publishedDate: new Date().toJSON(),
      _id: getID(),
    });
  }
};
