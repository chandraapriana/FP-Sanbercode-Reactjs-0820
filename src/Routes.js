import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Page/Login.js";
import Register from "./Page/Register.js";
import Movie from "./Page/Movie.js";
import DetailMovie from "./Page/DetailMovie.js";
import AddMovie from "./Page/AddMovie.js";
import EditMovie from "./Page/EditMovie.js";
import Games from "./Page/Games.js";
import DetailGames from "./Page/DetailGames.js";
import AddGame from "./Page/AddGame.js";
import EditGame from "./Page/EditGame.js";
import ChangePassword from "./Page/ChangePassword.js";

const Routes = () => {
  const TOKEN = window.localStorage.getItem("token");
  return (
    <Switch>
      <Route exact path="/">
        {TOKEN ? <Redirect to="/movie" /> : <Login />}
      </Route>
      <Route exact path="/register">
        {TOKEN ? <Redirect to="/movie" /> : <Register />}
      </Route>
      <Route exact path="/movie">
        {!TOKEN ? <Redirect to="/" /> : <Movie />}
      </Route>
      <Route exact path="/detail-movie/:id">
        {!TOKEN ? <Redirect to="/" /> : <DetailMovie />}
      </Route>
      <Route exact path="/add-movie">
        {!TOKEN ? <Redirect to="/" /> : <AddMovie />}
      </Route>
      <Route exact path="/edit-movie/:id">
        {!TOKEN ? <Redirect to="/" /> : <EditMovie />}
      </Route>
      <Route exact path="/games">
        {!TOKEN ? <Redirect to="/" /> : <Games />}
      </Route>
      <Route exact path="/detail-games/:id">
        {!TOKEN ? <Redirect to="/" /> : <DetailGames />}
      </Route>
      <Route exact path="/add-game">
        {!TOKEN ? <Redirect to="/" /> : <AddGame />}
      </Route>
      <Route exact path="/edit-game/:id">
        {!TOKEN ? <Redirect to="/" /> : <EditGame />}
      </Route>
      <Route exact path="/change-password">
        {!TOKEN ? <Redirect to="/" /> : <ChangePassword />}
      </Route>
    </Switch>
  );
};

export default Routes;
