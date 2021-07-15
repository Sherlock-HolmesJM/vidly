import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = { data: { username: "", name: "", password: "" }, errors: {} };

  schema = {
    username: Joi.string().email().required().label("Username"),
    name: Joi.string().required().label("Name"),
    password: Joi.string().min(5).required().label("Password"),
  };

  doSubmit() {
    console.log(this.state.data);
  }

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
