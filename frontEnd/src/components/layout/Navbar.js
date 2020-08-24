import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";

export default function Navbar() {
  return (
    <header id="header">
      <Link to="/">
        <span>
          <img src="./icon.png" height="40px" width="70px" alt="app-logo" />
        </span>
        <h1 className="title">NOTICE BOARD</h1>
      </Link>
      <AuthOptions />
    </header>
  );
}
