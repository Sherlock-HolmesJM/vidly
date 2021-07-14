import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import NavBar from "./components/common/navBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";

function App() {
  const navLinkItems = [
    { path: "movies", label: "Movies" },
    { path: "customers", label: "Customers" },
    { path: "rentals", label: "Rentals" },
    { path: "login", label: "Login" },
  ];

  return (
    <React.Fragment>
      <NavBar title="Vidly" items={navLinkItems} />
      <main className="container">
        <Switch>
          <Route path="/movies/:id" exact component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/login" component={LoginForm} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
