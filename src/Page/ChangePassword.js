import React, { useState } from "react";
import Axios from "axios";
import Footer from "../Components/Footer";
import Sidebar from "../Components/Sidebar";
import Header from "../Components/Header";
import FlashMessage from "react-flash-message";

const TOKEN = window.localStorage.getItem("token");

export default function ChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [verifNewPass, setVerifNewPass] = useState("");
  const [message, setMessage] = useState(false);

  const handleChange = (event) => {
    let typeOfInput = event.target.name;
    switch (typeOfInput) {
      case "oldPass": {
        setOldPass(event.target.value);
        break;
      }
      case "newPass": {
        setNewPass(event.target.value);
        break;
      }
      case "verifNewPass": {
        setVerifNewPass(event.target.value);
        break;
      }

      default: {
        break;
      }
    }
  };

  function handleSubmit(event) {
    event.preventDefault();

    Axios.post(
      `https://backendexample.sanbersy.com/api/change-password`,
      {
        current_password: oldPass,
        new_password: newPass,
        verification_new_password: verifNewPass,
      },
      {
        headers: { Authorization: `Bearer ${TOKEN}` },
      }
    )
      .then((res) => {
        console.log("is-success");
        console.log(res);
        setMessage(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <div className="d-flex justify-content-start" id="wrapper">
        <Sidebar />
        <div id="page-content-wrapper">
          <Header />
          <div className="container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="container col-lg-4 mt-4 ">
                {message && (
                  <FlashMessage duration={5000} persistOnHover={true}>
                    <div class="alert alert-success" role="alert">
                      Success Ganti Password
                    </div>
                  </FlashMessage>
                )}
                <h4>Change Password</h4>
                <div className="card p-3 ">
                  <div className="form-group">
                    <label for="oldPass">Password Lama</label>
                    <input
                      type="password"
                      className="form-control"
                      id="oldPass"
                      name="oldPass"
                      value={oldPass}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="newPass">Password Baru</label>
                    <input
                      type="password"
                      className="form-control"
                      id="newPass"
                      name="newPass"
                      value={newPass}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label for="password">Ulangi Password Baru</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="verifNewPass"
                      value={verifNewPass}
                      onChange={handleChange}
                    />
                  </div>

                  <button className="btn btn-primary">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
