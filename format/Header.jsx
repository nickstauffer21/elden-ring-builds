import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Header.css";
import "../images/er-logo.jpg";

export default function Header() {
  return (
    <header className="header">
      <Link className="logo" to="/builds">
        <img
          src="https://preview.redd.it/elden-ring-logo-v0-zkddd4rj5ktb1.png?auto=webp&s=51361339ac12d61b846d02506ee553e39c027ee8"
          className="er-logo-header"
        />
      </Link>
      <nav className="nav">
        <NavLink className="nav-link" to="/builds">
          Builds
        </NavLink>
        <NavLink className="nav-link" to="/weapons">
          Weapons
        </NavLink>
        <NavLink className="nav-link" to="/category3">
          Category 3
        </NavLink>
      </nav>
    </header>
  );
}
