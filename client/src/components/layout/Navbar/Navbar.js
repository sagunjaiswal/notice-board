import React from "react";
import { Link } from "react-router-dom";
import AuthOptions from "../../auth/AuthOptions";

import styles from "./style.module.css";

export default function Navbar() {
  return (
    <header id={styles.header}>
      <Link to="/">
        <img
          src="/NavLogo.svg"
          className={styles.navLogo}
          alt="app-logo"
        />
        <h1 className={styles.title}>NOTICE BOARD</h1>
      </Link>
      <AuthOptions />
    </header>
  );
}
