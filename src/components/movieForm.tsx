import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";
import { Movie, getMovie, saveMovie } from "../services/fakeMovieService";
import Form from "./common/form";

export interface MovieFormProps {
  movies: Movie[];
}

class MovieForm extends Form {
  state = {
    data: { title: "", dailyRentalRate: "", numberInStock: "", genreId: "" },
    genres: [],
    errors: {},
  };

  schema = {
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("Number in Stock"),
  };

  componentDidMount() {
    const genres = getGenres();

    const movieId = this.props.match.params.id;
    if (movieId === "new") return this.setState({ genres });

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(movie), genres });
  }

  mapToViewModel({ title, dailyRentalRate, numberInStock, genre }: Movie) {
    return { title, dailyRentalRate, numberInStock, genreId: genre._id };
  }

  mapToOptionModel({ _id, name }) {
    return { value: _id, label: name };
  }

  doSubmit() {
    const { data, genres } = this.state;
    const genre = genres.find((genre) => genre._id === data.genreId);
    const obj = { ...data, genre };
    saveMovie(obj as any);
    this.props.history.replace("/movies");
  }

  render() {
    const options = this.state.genres.map(this.mapToOptionModel);

    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", options)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
