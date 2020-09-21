import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Buttons from "./Page/Button.js";
import Login from "./Page/Login.js";
import Routes from "./Routes";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes></Routes>
      </Router>
    </div>
  );
}

export default App;
