import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Movie.css";
import Sidebar from "./../Components/Sidebar.js";
import Header from "./../Components/Header.js";
import Footer from "./../Components/Footer.js";

const TOKEN = window.localStorage.getItem("token");

export default function Movie() {
  const [daftarMovie, setDaftarMovie] = useState([]);
  const [inputSearch, setSearch] = useState("");
  const [inputSort, setSort] = useState("");

  useEffect(() => {
    if (inputSearch === "" && inputSort === "") {
      getData();
    } else {
      setSort("");
      setSearch("");
    }
  }, []);

  const auth = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const getData = () => {
    Axios.get(`https://backendexample.sanbersy.com/api/data-movie`, auth).then(
      (res) => {
        setDaftarMovie(res.data);
      }
    );
  };
  const handleDelete = (id) => {
    Axios.delete(
      `https://backendexample.sanbersy.com/api/data-movie/${id}`,
      auth
    ).then((res) => {
      getData();
    });
  };

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    if (inputSearch === "") {
      getData();
    } else {
      for (var i = 0; i < daftarMovie.length; i++) {
        if (
          daftarMovie[i].title.toLowerCase().includes(inputSearch.toLowerCase())
        ) {
          setDaftarMovie([daftarMovie[i]]);
        }
      }
    }
  };

  const filterYear = (year) => {
    var tempArray = [];
    if (year != 2018) {
      for (var i = 0; i < daftarMovie.length; i++) {
        if (daftarMovie[i].year === year) {
          tempArray.push(daftarMovie[i]);
        }
      }
    } else {
      for (var i = 0; i < daftarMovie.length; i++) {
        if (daftarMovie[i].year <= year) {
          tempArray.push(daftarMovie[i]);
        }
      }
    }
    setDaftarMovie(tempArray);
  };

  const filterRating = (rating) => {
    var tempArray = [];
    if (rating === "tinggi") {
      for (var i = 0; i < daftarMovie.length; i++) {
        if (daftarMovie[i].rating >= 8) {
          tempArray.push(daftarMovie[i]);
        }
      }
    } else if (rating === "sedang") {
      for (var i = 0; i < daftarMovie.length; i++) {
        if (daftarMovie[i].rating >= 5 && daftarMovie[i].rating <= 7) {
          tempArray.push(daftarMovie[i]);
        }
      }
    } else {
      for (var i = 0; i < daftarMovie.length; i++) {
        if (daftarMovie[i].rating < 5) {
          tempArray.push(daftarMovie[i]);
        }
      }
    }
    setDaftarMovie(tempArray);
  };

  const filterGenre = (genre) => {
    var tempArray = [];
    if (genre === "Action") {
      for (var i = 0; i < daftarMovie.length; i++) {
        if (daftarMovie[i].genre.toLowerCase().includes("action")) {
          tempArray.push(daftarMovie[i]);
        }
      }
    } else if (genre === "Comedy") {
      for (var i = 0; i < daftarMovie.length; i++) {
        if (daftarMovie[i].genre.toLowerCase().includes("comedy")) {
          tempArray.push(daftarMovie[i]);
        }
      }
    } else if (genre === "Horror") {
      for (var i = 0; i < daftarMovie.length; i++) {
        if (daftarMovie[i].genre.toLowerCase().includes("horror")) {
          tempArray.push(daftarMovie[i]);
        }
      }
    }

    setDaftarMovie(tempArray);
  };

  const sort = (name) => {
    var obj = [...daftarMovie];

    if (name === "ratingTertinggi") {
      setSort("sort");
      obj.sort((a, b) => b.rating - a.rating);
      console.log(obj);
      setDaftarMovie(obj);
    } else if (name === "ratingTerendah") {
      setSort("sort");
      obj.sort((a, b) => a.rating - b.rating);
      console.log(obj);
      setDaftarMovie(obj);
    } else if (name === "yearTertinggi") {
      setSort("sort");
      obj.sort((a, b) => b.year - a.year);
      setDaftarMovie(obj);
    } else if (name === "yearTerendah") {
      setSort("sort");
      obj.sort((a, b) => a.year - b.year);
      setDaftarMovie(obj);
    }
  };

  console.log(daftarMovie);

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
            <div className="d-flex justify-content-start">
              <a href="/add-movie" className="btn btn-primary mt-2 mb-2   ">
                Add Movie
              </a>
              <form class="ml-2 form-inline " onSubmit={handleSearch}>
                <div class="input-group ">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="search movie.."
                    aria-label="search movie"
                    aria-describedby="button-addon2"
                    value={inputSearch}
                    onChange={handleChangeSearch}
                  />
                  <div class="input-group-append">
                    <button
                      class="btn btn-outline-secondary"
                      type="submit"
                      id="button-addon2"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </form>
              <div class="dropdown ml-2 mt-2">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Urutkan
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <button
                    className="dropdown-item"
                    onClick={() => sort("ratingTertinggi")}
                  >
                    Rating Tertinggi
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => sort("ratingTerendah")}
                  >
                    Rating Terendah
                  </button>
                  <div class="dropdown-divider"></div>
                  <button
                    className="dropdown-item"
                    onClick={() => sort("yearTertinggi")}
                  >
                    Tahun Tertinggi
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => sort("yearTerendah")}
                  >
                    Tahun Terendah
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-2">
                <div className="card  ">
                  <h5 className="card-title">Filter</h5>
                  <div class="dropdown m-2">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Year
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => filterYear(2020)}
                      >
                        2020
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => filterYear(2019)}
                      >
                        2019
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => filterYear(2018)}
                      >
                        2018
                      </button>
                    </div>
                  </div>

                  <div class="dropdown m-2">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Rating
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => filterRating("tinggi")}
                      >
                        diatas 8
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => filterRating("sedang")}
                      >
                        diatas 5 dan dibawah 8
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => filterRating("rendah")}
                      >
                        dibawah 5
                      </button>
                    </div>
                  </div>

                  <div class="dropdown m-2">
                    <button
                      class="btn btn-secondary dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Genre
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => filterGenre("Action")}
                      >
                        Action
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => filterGenre("Comedy")}
                      >
                        Comedy
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => filterGenre("Horror")}
                      >
                        Horror
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-10">
                {" "}
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Title</th>
                      <th scope="col">Year</th>
                      <th scope="col">Rating</th>
                      <th scope="col">Genre</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {console.log("daftar", daftarMovie)}
                    {daftarMovie.map((item, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{item.title}</td>
                          <td>{item.year}</td>
                          <td>{item.rating}</td>
                          <td>{item.genre}</td>
                          <td>
                            <a
                              href={`/detail-movie/${item.id}`}
                              className="btn btn-success mr-2"
                            >
                              <i class="fas fa-eye"></i>
                            </a>
                            <a
                              href={`/edit-movie/${item.id}`}
                              className="btn btn-warning mr-2"
                            >
                              <i class="fas fa-edit text-white"></i>
                            </a>
                            <button
                              onClick={() => handleDelete(item.id)}
                              value={index}
                              className="btn btn-danger"
                            >
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
