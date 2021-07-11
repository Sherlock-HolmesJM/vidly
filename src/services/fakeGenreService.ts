export const genres = [
  { _id: 'fffd345aaee', name: 'Action' },
  { _id: 'fffd345aaef', name: 'Comedy' },
  { _id: 'fffd345aaeg', name: 'Thriller' },
];

export const getGenreID = (name: string) =>
  genres.find((genre) => genre.name === name)?._id;

export function getGenres() {
  return genres.filter((g) => g);
}

export type TGenres = typeof genres[0];
