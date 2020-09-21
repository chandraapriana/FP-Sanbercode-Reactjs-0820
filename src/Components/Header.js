import React from "react";

export default function Header() {
  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <nav class="pl-1 navbar navbar-expand-lg navbar-dark bg-dark border-bottom">
      <h5 className="text-white font-weight-light ml-3">
        Hello{" "}
        <span className="font-weight-normal">
          {localStorage.getItem("name")}
        </span>
        !
      </h5>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto mt-2 mt-lg-0">
          <li class="nav-item">
            <btn class="nav-link" onClick={() => logout()}>
              Sign Out
            </btn>
          </li>
        </ul>
      </div>
    </nav>
  );
}
