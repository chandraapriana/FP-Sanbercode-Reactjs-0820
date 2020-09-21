import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Movie.css";
import Sidebar from "./../Components/Sidebar.js";
import Header from "./../Components/Header.js";
import Footer from "./../Components/Footer.js";
import { withRouter } from "react-router-dom";

const TOKEN = window.localStorage.getItem("token");
console.log(TOKEN);
export default function AddMovie() {
  const [daftarMovie, setDaftarMovie] = useState([]);
  // useEffect(() => {
  //   if (inputSearch === "") {
  //     getData();
  //   }
  // }, []);

  // const getData = () => {
  //   Axios.get(`http://backendexample.sanbercloud.com/api/movies`).then(
  //     (res) => {
  //       setDaftarMovie(res.data);
  //     }
  //   );
  // };

  const [inputTitle, setTitle] = useState("");
  const [inputDescription, setDescription] = useState("");
  const [inputYear, setYear] = useState(2020);
  const [inputGenre, setGenre] = useState("");
  const [inputDuration, setDuration] = useState(120);
  const [inputRating, setRating] = useState(0);
  const [inputImage, setImage] = useState("");

  const handleChange = (event) => {
    let typeOfInput = event.target.name;
    switch (typeOfInput) {
      case "title": {
        setTitle(event.target.value);
        break;
      }
      case "description": {
        setDescription(event.target.value);
        break;
      }
      case "year": {
        setYear(event.target.value);
        break;
      }
      case "duration": {
        setDuration(event.target.value);
        break;
      }
      case "genre": {
        setGenre(event.target.value);
        break;
      }
      case "rating": {
        setRating(event.target.value);
        break;
      }
      case "image": {
        setImage(event.target.value);
        break;
      }
      default: {
        break;
      }
    }
  };

  const auth = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    Axios.post(
      `https://backendexample.sanbersy.com/api/data-movie`,
      {
        title: inputTitle,
        description: inputDescription,
        duration: inputDuration,
        year: inputYear,
        genre: inputGenre,
        rating: inputRating,
        image_url: inputImage,
      },
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      }
    )
      .then((res) => {
        console.log("is-success");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    window.location = "/movie";
  };

  return (
    <div>
      <div class="d-flex" id="wrapper">
        {/* <!-- Sidebar --> */}
        <Sidebar />
        {/* <!-- /#sidebar-wrapper --> */}

        {/* <!-- Page Content --> */}
        <div id="page-content-wrapper">
          <Header />
          <div class="container-fluid">
            <h1 className="m-3">Add Movie</h1>
            <form onSubmit={handleSubmit}>
              <div class="form-group row">
                <label for="Title" class="col-sm-2 col-form-label">
                  Title
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="title"
                    class="form-control"
                    id="Title"
                    value={inputTitle}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="Description" class="col-sm-2 col-form-label">
                  Description
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="description"
                    class="form-control"
                    id="Description"
                    value={inputDescription}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="Genre" class="col-sm-2 col-form-label">
                  Genre
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="genre"
                    class="form-control"
                    id="Genre"
                    value={inputGenre}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="Rating" class="col-sm-2 col-form-label">
                  Rating
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="rating"
                    class="form-control"
                    id="Rating"
                    value={inputRating}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="Year" class="col-sm-2 col-form-label">
                  Year
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="year"
                    class="form-control"
                    id="Year"
                    value={inputYear}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="Duration" class="col-sm-2 col-form-label">
                  Duration
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="duration"
                    class="form-control"
                    id="Duration"
                    value={inputDuration}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="Image" class="col-sm-2 col-form-label">
                  Image
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="image"
                    class="form-control"
                    id="Image"
                    value={inputImage}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
