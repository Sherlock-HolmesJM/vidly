import React from "react";
import { Link } from "react-router-dom";
import SortColumn from "../types/sortColumn";
import Movie from "../types/movie";
import Like from "./common/like";
import Table from "./common/table";

export interface MoviesTableProps {
  movies: Movie[];
  onDelete: (movie: Movie) => void;
  onLike: (movie: Movie) => void;
  onSort: (sortColumn: SortColumn) => void;
  sortColumn: SortColumn;
}

class MoviesTable extends React.Component<MoviesTableProps> {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie: Movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie: Movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie: Movie) => (
        <button
          onClick={() => this.props.onDelete(movie)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        data={movies}
        sortColumn={sortColumn}
        columns={this.columns}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
