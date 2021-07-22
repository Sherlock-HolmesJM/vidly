export default interface Movie {
  _id: string;
  title: string;
  genre: { _id?: string; name: string };
  numberInStock: number;
  dailyRentalRate: number;
  publishedDate: string;
  liked: boolean;
}
