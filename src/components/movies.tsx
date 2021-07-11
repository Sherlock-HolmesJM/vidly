import { Component } from 'react';
import { getMovies, Movie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from '../common/pagination';
import { paginate } from '../utils/paginate';
import { sort } from '../utils/sort';
import ListGroup from '../common/listGroup';
import MoviesTable from './moviesTable';
import { SortColumn } from '../common/tableHeader';

export interface Props {}

export interface State {
  movies: Movie[];
  genres: any[];
  pageSize: number;
  currentPage: number;
  selectedGenre: any;
  sortColumn: any;
}

class Movies extends Component<Props, State> {
  state = {
    movies: [] as Movie[],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: { name: 'All Genres', _id: '' },
    sortColumn: { path: 'title', order: 'asc' },
  };

  componentDidMount() {
    const genres = [this.state.selectedGenre, ...getGenres()];

    this.setState({ movies: getMovies('All Genres'), genres });
  }

  handleDelete = (movie: Movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
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
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (sortColumn: SortColumn) => {
    this.setState({ sortColumn });
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      genres,
      selectedGenre,
      sortColumn,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const { length: count } = filtered;

    if (count === 0) return <p>There are no movies in the database.</p>;

    const sorted = sort(filtered, sortColumn.path, sortColumn.order);

    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className='row'>
        <div className='col-3'>
          <ListGroup
            items={genres}
            selectedItem={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className='col'>
          <p>Showing {count} movies in the database.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLike={this.handleLike}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={count}
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
