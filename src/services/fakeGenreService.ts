export const genres = [
  { _id: "fffd345aaee", name: "Action" },
  { _id: "fffd345aaef", name: "Comedy" },
  { _id: "fffd345aaeg", name: "Thriller" },
];

export const getGenreID = (name: string) => {
  return genres.find((genre) => genre.name === name)?._id;
};

export const getGenre = (name: "Action" | "Comedy" | "Thriller") => {
  return genres.find((genre) => genre.name === name);
};

export function getGenres() {
  return [...genres];
}

export type Genre = typeof genres[0];
