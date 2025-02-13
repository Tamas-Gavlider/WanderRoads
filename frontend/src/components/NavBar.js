import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  console.log("Current User:", currentUser);
  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInLinks = (
    <>
      <NavLink
        exact
        to="/map"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Map
      </NavLink>
      <NavLink
        to="/profile"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Profile
      </NavLink>
      <NavLink
        to="/posts"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Posts
      </NavLink>
      <NavLink
        to="/travel-buddies"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Travel Buddies
      </NavLink>
      <NavLink
        to="/logout"
        onClick={handleSignOut}
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Logout
      </NavLink>
      <div>Logged in as {currentUser?.username}</div>
    </>
  );
  const loggedOutLinks = (
    <>
      <NavLink
        to="/signin"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Login
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Register
      </NavLink>
    </>
  );

  return (
    <Navbar expand="lg" className={styles.NavBar} fixed="to">
      <Container fluid>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="75" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {currentUser ? loggedInLinks : loggedOutLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
