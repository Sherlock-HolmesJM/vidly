import Joi from "joi";
import { getGenres } from "../services/genreService";
import { getMovie, saveMovie } from "../services/movieService";
import Movie from "../types/movie";
import Form from "./common/form";

export interface MovieFormProps {
  movies: Movie[];
}

class MovieForm extends Form {
  state = {
    data: {
      _id: "new",
      title: "",
      dailyRentalRate: "",
      numberInStock: "",
      genreId: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
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
    this.populateGenres();
    this.populateMovie();
  }

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (e) {
      if (e.response && e.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  mapToViewModel({ _id, title, dailyRentalRate, numberInStock, genre }: Movie) {
    return { _id, title, dailyRentalRate, numberInStock, genreId: genre._id };
  }

  mapToOptionModel({ _id, name }) {
    return { value: _id, label: name };
  }

  async doSubmit() {
    await saveMovie(this.state.data);

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
