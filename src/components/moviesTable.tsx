import React from 'react';
import { Movie } from '../services/fakeMovieService';
import Like from '../common/like';
import TableHeader, { SortColumn } from '../common/tableHeader';

export interface MoviesTableProps {
  movies: Movie[];
  onDelete: (movie: Movie) => void;
  onLike: (movie: Movie) => void;
  onSort: (sortColumn: SortColumn) => void;
  sortColumn: SortColumn;
}

class MoviesTable extends React.Component<MoviesTableProps> {
  columns = [
    { path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {},
    {},
  ];

  render() {
    const { movies, onDelete, onLike, onSort, sortColumn } = this.props;

    return (
      <table className='table'>
        <TableHeader
          columns={this.columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <tbody>
          {movies.map((m) => (
            <tr key={m._id}>
              <td>{m.title}</td>
              <td>{m.genre.name}</td>
              <td>{m.numberInStock}</td>
              <td>{m.dailyRentalRate}</td>
              <td>
                <Like liked={m.liked} onClick={() => onLike(m)} />
              </td>
              <td>
                <button
                  onClick={() => onDelete(m)}
                  className='btn btn-danger btn-sm'
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
