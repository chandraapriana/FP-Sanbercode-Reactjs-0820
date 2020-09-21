import React from "react";

export default function Sidebar() {
  return (
    <div class="bg-dark border-right" id="sidebar-wrapper">
      <div class="sidebar-heading text-light">GeMov</div>
      <div class="list-group list-group-flush">
        <a
          href="/change-password"
          class="list-group-item list-group-item-action bg-dark text-white"
        >
          <i class="fas fa-key"></i> Change Password
        </a>
        <a
          href="/movie"
          class="list-group-item list-group-item-action bg-dark text-white"
        >
          <i class="fas fa-film"></i> Movie
        </a>
        <a
          href="/games"
          class="list-group-item list-group-item-action bg-dark text-white"
        >
          <i class="fas fa-gamepad"></i> Game
        </a>
      </div>
    </div>
  );
}
