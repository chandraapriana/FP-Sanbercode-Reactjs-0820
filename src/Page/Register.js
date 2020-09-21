import React, { useState } from "react";
import Axios from "axios";

import Navbar from "../Components/Navbar.js";
import Footer from "../Components/Footer.js";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  const handleChange = (event) => {
    let typeOfInput = event.target.name;
    switch (typeOfInput) {
      case "name": {
        setName(event.target.value);
        break;
      }
      case "email": {
        setEmail(event.target.value);
        break;
      }
      case "password": {
        setPassword(event.target.value);
        break;
      }

      default: {
        break;
      }
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    Axios.post(`https://backendexample.sanbersy.com/api/register`, {
      name: name,
      email: email,
      password: password,
    }).then((res) => {
      console.log(res);
    });
  }

  return (
    <div className="Login">
      <Navbar></Navbar>

      <form onSubmit={handleSubmit}>
        <div className="container col-lg-4 mt-4 ">
          <h1>Welcome to GeMov</h1>
          <div className="card p-3 ">
            <div className="form-group">
              <label for="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label for="email">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </div>

            <button className="btn btn-primary">Submit</button>
            <a href="/" className="mt-2">
              allready have account?
            </a>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
}
