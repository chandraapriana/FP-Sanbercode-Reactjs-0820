import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Movie.css";
import Sidebar from "./../Components/Sidebar.js";
import Header from "./../Components/Header.js";
import Footer from "./../Components/Footer.js";
import { withRouter } from "react-router-dom";

const TOKEN = window.localStorage.getItem("token");
console.log(TOKEN);
function EditGame(props) {
  const [daftarGame, setDaftarGame] = useState([]);
  const [inputName, setName] = useState("");
  const [inputPlatform, setPlatform] = useState("");
  const [inputRealease, setRelease] = useState(2020);
  const [inputGenre, setGenre] = useState("");
  const [inputPlayer, setPlayer] = useState("singlePlayer");
  const [inputSinglePlayer, setSinglePlayer] = useState(1);
  const [inputMultiPlayer, setMultiPlayer] = useState(0);
  const [inputImage, setImage] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    Axios.get(
      `https://backendexample.sanbersy.com/api/data-game/${props.match.params.id}`
    ).then((res) => {
      console.log(res.data);
      setName(res.data.name);
      setPlatform(res.data.platform);
      setRelease(res.data.release);
      setGenre(res.data.genre);
      setSinglePlayer(res.data.singlePlayer);
      setMultiPlayer(res.data.multiplayer);
      setImage(res.data.image_url);
    });
  };

  const handleChange = (event) => {
    let typeOfInput = event.target.name;

    switch (typeOfInput) {
      case "name": {
        setName(event.target.value);
        break;
      }
      case "platform": {
        setPlatform(event.target.value);
        break;
      }
      case "release": {
        setRelease(event.target.value);
        break;
      }
      case "player": {
        setPlayer(event.target.value);
        console.log(event.target.value);
        if (event.target.value === "singlePlayer") {
          console.log("ini singlepart");
          setSinglePlayer(1);
          setMultiPlayer(0);
        } else {
          console.log("ini multipart");
          setMultiPlayer(1);
          setSinglePlayer(0);
        }
        break;
      }
      case "genre": {
        setGenre(event.target.value);
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
    Axios.put(
      `https://backendexample.sanbersy.com/api/data-game/${props.match.params.id}`,
      {
        name: inputName,
        platform: inputPlatform,
        singlePlayer: inputSinglePlayer,
        multiplayer: inputMultiPlayer,
        release: inputRealease,
        genre: inputGenre,
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
    window.location = "/games";
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
            <h1 className="m-3">Edit Movie</h1>
            <form onSubmit={handleSubmit}>
              <div class="form-group row">
                <label for="Title" class="col-sm-2 col-form-label">
                  Title
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="name"
                    class="form-control"
                    id="Title"
                    value={inputName}
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
                    name="platform"
                    class="form-control"
                    id="Description"
                    value={inputPlatform}
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
                <label for="Year" class="col-sm-2 col-form-label">
                  Year
                </label>
                <div class="col-sm-10">
                  <input
                    type="text"
                    name="release"
                    class="form-control"
                    id="Year"
                    value={inputRealease}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="Player" class="col-sm-2 col-form-label">
                  Player
                </label>
                <div class="col-sm-10">
                  {/* <input
                    type="text"
                    name="player"
                    class="form-control"
                    id="Player"
                    value={inputPlayer}
                    onChange={handleChange}
                  /> */}
                  <select
                    value={inputPlayer}
                    onChange={handleChange}
                    name="player"
                    class="form-control"
                    id="exampleFormControlSelect1"
                  >
                    {inputSinglePlayer === 1 ? (
                      <option selected value="singlePlayer">
                        Single Player
                      </option>
                    ) : (
                      <option value="singlePlayer">Single Player</option>
                    )}
                    {inputMultiPlayer === 1 ? (
                      <option selected value="MultiPlayer">
                        Multi Player
                      </option>
                    ) : (
                      <option value="MultiPlayer">Multi Player</option>
                    )}
                  </select>
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
              <button className="btn btn-warning">Edit</button>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default withRouter(EditGame);
