import Joi from "joi";
import Form from "./common/form";
import { register } from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { username: "", name: "", password: "" },
    errors: { username: "" },
  };

  schema = {
    username: Joi.string().email().required().label("Username"),
    name: Joi.string().required().label("Name"),
    password: Joi.string().min(5).required().label("Password"),
  };

  async doSubmit() {
    try {
      const { headers } = await register(this.state.data);
      auth.loginWithJwt(headers["x-auth-token"]);
      window.location.href = "/";
    } catch (e) {
      if (e.response && e.response.status === 400)
        this.setErrorProperty("username", e.response.data);
    }
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
