import { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface MovieFormProps {}

export interface MovieFormState {}

class MovieForm extends Component<RouteComponentProps, MovieFormState> {
  handleSave = () => {
    this.props.history.replace('/movies');
  };

  render() {
    return (
      <div>
        <h1>Movie Form {this.props.match.params.id}</h1>
        <button className='btn btn-primary btn-sm' onClick={this.handleSave}>
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
