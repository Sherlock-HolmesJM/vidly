import React, { Component } from 'react';
import { getMovies, Movie } from '../services/fakeMovieService';
import Like from '../common/like';
import Pagination from '../common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from '../common/listGroup';

export interface Props {}

export interface State {
  movies: Movie[];
  pageSize: number;
  currentPage: number;
}

class Movies extends Component<Props, State> {
  state = { movies: getMovies(), pageSize: 4, currentPage: 1 };

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

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, movies: allMovies } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;
    const movies = paginate(allMovies, currentPage, pageSize);

    console.log({ currentPage });
    console.log(movies);

    return (
      <div className='row'>
        <div className='col-2'>
          <ListGroup />
        </div>
        <div className='col'>
          <p>Showing {count} movies in the database.</p>
          <table className='table'>
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m) => (
                <tr key={m._id}>
                  <td>{m.title}</td>
                  <td>{m.genre.name}</td>
                  <td>{m.numberInStock}</td>
                  <td>{m.dailyRentalRate}</td>
                  <td>
                    <Like liked={m.liked} onClick={() => this.handleLike(m)} />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(m)}
                      className='btn btn-danger btn-sm'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
