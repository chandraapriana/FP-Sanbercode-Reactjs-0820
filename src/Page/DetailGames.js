import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./Movie.css";
import Sidebar from "./../Components/Sidebar.js";
import Header from "./../Components/Header.js";
import Footer from "./../Components/Footer.js";
import { withRouter } from "react-router-dom";

// { headers: {"Authorization" : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYmFja2VuZGV4YW1wbGUuc2FuYmVyc3kuY29tXC9hcGlcL3VzZXItbG9naW4iLCJpYXQiOjE2MDA1MjQwNTgsImV4cCI6MTYwMDYxMDQ1OCwibmJmIjoxNjAwNTI0MDU4LCJqdGkiOiJLcG5LYUpsSDYzRmlvTjlvIiwic3ViIjoxMTAsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.g_NI9jW3-Hq_ytN8IFcgdXH8krTjwOLoeegOzqHfyS0`}

function DetailGames(props) {
  const [Game, setGame] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const auth = {
      headers: {
        Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYmFja2VuZGV4YW1wbGUuc2FuYmVyc3kuY29tXC9hcGlcL3VzZXItbG9naW4iLCJpYXQiOjE2MDA1MjQwNTgsImV4cCI6MTYwMDYxMDQ1OCwibmJmIjoxNjAwNTI0MDU4LCJqdGkiOiJLcG5LYUpsSDYzRmlvTjlvIiwic3ViIjoxMTAsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.g_NI9jW3-Hq_ytN8IFcgdXH8krTjwOLoeegOzqHfyS0`,
      },
    };

    Axios.get(
      `http://backendexample.sanbersy.com/api/data-game/${props.match.params.id}`,
      auth
    ).then((res) => {
      console.log(res.data);
      setGame(res.data);
    });
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
            <div className="row mt-3">
              <div className="col-lg-4">
                <img
                  src={`${Game.image_url}`}
                  style={{ width: "20rem" }}
                  alt=""
                />
              </div>
              <div className="col-lg-8 ">
                <div className="row">
                  <div className="col-lg-3 ">
                    <h5 className="text-left">Name</h5>
                  </div>
                  <div className="col-lg-9">
                    <h5 className="text-left">{Game.name}</h5>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-3 ">
                    <h5 className="text-left">Platform</h5>
                  </div>
                  <div className="col-lg-9">
                    <h5 className="text-left">{Game.platform}</h5>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-3 ">
                    <h5 className="text-left">Genre</h5>
                  </div>
                  <div className="col-lg-9">
                    <h5 className="text-left">{Game.genre}</h5>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-lg-3 ">
                    <h5 className="text-left">Player</h5>
                  </div>
                  <div className="col-lg-9">
                    <h5 className="text-left">
                      {Game.singlePlayer === 1
                        ? "Single Player"
                        : "MultiPlayer"}
                    </h5>
                  </div>
                </div>
                <hr />

                <div className="row">
                  <div className="col-lg-3 ">
                    <h5 className="text-left">Release</h5>
                  </div>
                  <div className="col-lg-9">
                    <h5 className="text-left">{Game.release}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default withRouter(DetailGames);
