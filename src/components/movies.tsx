import { Component } from "react";
import { Link } from "react-router-dom";
import { deleteMovie, getMovies, Movie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { sort } from "../utils/sort";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import { SortColumn } from "./common/tableHeader";
import SearchBox from "./common/searchBox";

export interface Props {}

export interface State {
  movies: Movie[];
  genres: any[];
  pageSize: number;
  currentPage: number;
  selectedGenre: any;
  sortColumn: any;
  searchQuery: string;
}

class Movies extends Component<Props, State> {
  state = {
    movies: [] as Movie[],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: { name: "All Genres", _id: "" },
    sortColumn: { path: "title", order: "asc" },
    searchQuery: "",
  };

  componentDidMount() {
    const genres = [this.state.selectedGenre, ...getGenres()];

    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie: Movie) => {
    const movies = deleteMovie(movie);
    this.setState({ movies });
  };

  handleLike = (movie: Movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movie, liked: !movie.liked };
    this.setState({ movies });
  };

  handlePageChange = (page: number) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre: any) => {
    this.setState({ selectedGenre: genre, currentPage: 1, searchQuery: "" });
  };

  handleSort = (sortColumn: SortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query: string) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    const filtered = searchQuery
      ? allMovies.filter((m) =>
          m.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : selectedGenre && selectedGenre._id
      ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
      : allMovies;

    const sorted = sort(filtered, sortColumn.path, sortColumn.order);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link
            to="/movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
