import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.landingPage}>
      <div className={styles.buttonContainer}>
        <NavLink to="/signin" className={styles.link}>Login</NavLink>
        <NavLink to="/signup" className={styles.link}>Register</NavLink>
      </div>
      <p className={styles.tagline}>Your Journey, Your Story, Your Memory.</p>
    </div>
  );
}