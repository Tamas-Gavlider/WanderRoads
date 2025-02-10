import React from "react";
import { NavLink } from "react-router-dom";
import styles from "../styles/Home.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import NavBar from './NavBar'

export default function Home() {
  const currentUser = useCurrentUser();
  const loggedOutIcons = ( <div className={styles.landingPage}>
    <div className={styles.buttonContainer}>
      <NavLink to="/signin" className={styles.link}>Login</NavLink>
      <NavLink to="/signup" className={styles.link}>Register</NavLink>
    </div>
    <p className={styles.tagline}>Your Journey, Your Story, Your Memory.</p>
  </div>)

  return currentUser ? <NavBar /> : loggedOutIcons;
}