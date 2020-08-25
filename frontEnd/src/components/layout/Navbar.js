import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../auth/AuthOptions";

export default function Navbar() {
  return (
    <header id="header">
      <Link to="/">
        <img
          src="/icon.png"
          height="40px"
          width="30px"
          alt="app-logo"
          style={{ marginBottom: 15, marginTop: 15 }}
        />
        <h1
          style={{
            display: "inline",
            marginLeft: 0,
            // marginTop: "11px",
            // marginBottom: "11px",
          }}
          className="title"
        >
          NOTICE BOARD
        </h1>
      </Link>
      <AuthOptions />
    </header>
  );
}
