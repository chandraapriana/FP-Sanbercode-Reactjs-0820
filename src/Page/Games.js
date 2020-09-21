import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Movie.css";
import Sidebar from "./../Components/Sidebar.js";
import Header from "./../Components/Header.js";
import Footer from "./../Components/Footer.js";
const TOKEN = window.localStorage.getItem("token");

export default function Games() {
  const [daftarGames, setDaftarGames] = useState([]);
  const [inputSearch, setSearch] = useState("");
  const [inputSort, setSort] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const auth = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const getData = () => {
    Axios.get(`https://backendexample.sanbersy.com/api/data-game`, auth).then(
      (res) => {
        setDaftarGames(res.data);
      }
    );
  };

  const handleDelete = (id) => {
    Axios.delete(
      `https://backendexample.sanbersy.com/api/data-game/${id}`,
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
      for (var i = 0; i < daftarGames.length; i++) {
        if (
          daftarGames[i].name.toLowerCase().includes(inputSearch.toLowerCase())
        ) {
          setDaftarGames([daftarGames[i]]);
        }
      }
    }
  };

  const filterRelease = (year) => {
    var tempArray = [];
    if (year != 2018) {
      for (var i = 0; i < daftarGames.length; i++) {
        if (parseInt(daftarGames[i].release) === year) {
          tempArray.push(daftarGames[i]);
        }
      }
    } else {
      for (var i = 0; i < daftarGames.length; i++) {
        if (parseInt(daftarGames[i].release) <= year) {
          tempArray.push(daftarGames[i]);
        }
      }
    }
    console.log(tempArray);
    setDaftarGames(tempArray);
  };

  const filterGenre = (genre) => {
    var tempArray = [];
    if (genre === "Action") {
      for (var i = 0; i < daftarGames.length; i++) {
        if (daftarGames[i].genre.toLowerCase().includes("action")) {
          tempArray.push(daftarGames[i]);
        }
      }
    } else if (genre === "MOBA") {
      for (var i = 0; i < daftarGames.length; i++) {
        if (daftarGames[i].genre.toLowerCase().includes("moba")) {
          tempArray.push(daftarGames[i]);
        }
      }
    } else if (genre === "Horror") {
      for (var i = 0; i < daftarGames.length; i++) {
        if (daftarGames[i].genre.toLowerCase().includes("horror")) {
          tempArray.push(daftarGames[i]);
        }
      }
    }

    setDaftarGames(tempArray);
  };

  const filterPlatform = (platform) => {
    var tempArray = [];
    if (platform === "PC") {
      for (var i = 0; i < daftarGames.length; i++) {
        if (daftarGames[i].platform.toLowerCase().includes("pc")) {
          tempArray.push(daftarGames[i]);
        }
      }
    } else if (platform === "Playstation") {
      for (var i = 0; i < daftarGames.length; i++) {
        if (daftarGames[i].platform.toLowerCase().includes("playstation")) {
          tempArray.push(daftarGames[i]);
        }
      }
    } else if (platform === "Xbox") {
      for (var i = 0; i < daftarGames.length; i++) {
        if (daftarGames[i].platform.toLowerCase().includes("xbox")) {
          tempArray.push(daftarGames[i]);
        }
      }
    }

    setDaftarGames(tempArray);
  };

  const sort = (name) => {
    var obj = [...daftarGames];

    if (name === "releaseTerbaru") {
      setSort("sort");
      var obj = daftarGames;
      obj.sort((a, b) => parseInt(b.release) - parseInt(a.release));
      setDaftarGames(obj);
    } else if (name === "releaseLama") {
      setSort("sort");
      obj.sort((a, b) => parseInt(a.release) - parseInt(b.release));
      setDaftarGames(obj);
    }
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
            <div className="d-flex justify-content-start">
              <a href="/add-game" className="btn btn-primary mt-2 mb-2   ">
                Add Game
              </a>
              <form class="ml-2 form-inline " onSubmit={handleSearch}>
                <div class="input-group ">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="search game.."
                    aria-label="search game"
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
                    onClick={() => sort("releaseTerbaru")}
                  >
                    Game Terbaru
                  </button>
                  <button
                    className="dropdown-item"
                    onClick={() => sort("releaseLama")}
                  >
                    Game Lama
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
                        onClick={() => filterRelease(2020)}
                      >
                        2020
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => filterRelease(2019)}
                      >
                        2019
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => filterRelease(2018)}
                      >
                        kurang dari 2018
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
                      Platform
                    </button>
                    <div
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => filterPlatform("PC")}
                      >
                        PC
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => filterPlatform("Playstation")}
                      >
                        Playstation
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={() => filterPlatform("Xbox")}
                      >
                        Xbox
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
                        onClick={() => filterGenre("MOBA")}
                      >
                        Moba
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
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Release</th>
                      <th scope="col">Platform</th>
                      <th scope="col">Genre</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {daftarGames.map((item, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{item.name}</td>
                          <td>{item.release}</td>
                          <td>{item.platform}</td>
                          <td>{item.genre}</td>
                          <td>
                            <a
                              href={`/detail-games/${item.id}`}
                              className="btn btn-success mr-2"
                            >
                              <i class="fas fa-eye"></i>
                            </a>
                            <a
                              href={`/edit-game/${item.id}`}
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
