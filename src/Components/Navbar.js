import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = (props) => {
  const [path, setPath] = useState("");
  useEffect(() => {
    setPath("/" + window.location.pathname.split("/")[1]);
  }, []);

  console.log(path);
  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-dark ">
      <a class="navbar-brand text-white" href="#">
        GeMov
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav"></div>
    </nav>
  );
};

export default Navbar;
