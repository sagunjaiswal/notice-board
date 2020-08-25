import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";

export default function Navbar() {
  return (
    <header id="header">
      <Link to="/">
        <img
          src="/icon.png"
          className="nav-logo"
          // height="40px"
          // width="30px"
          alt="app-logo"
        />
        <h1 className="title">NOTICE BOARD</h1>
      </Link>
      <AuthOptions />
    </header>
  );
}
