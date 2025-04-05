import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/NavBar.module.css";
import { NavLink, useHistory } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import Avatar from "./Avatar";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();
  const history = useHistory();
  // Custom hook to handle collapsing the navbar when clicking outside
  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  // Handle user logout
  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  // Links shown when a user is logged in
  const loggedInLinks = (
    <>
      <NavLink
        exact
        to="/"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Home
      </NavLink>
      <NavLink
        to="/map"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Map
      </NavLink>
      <NavLink
        to="/feed"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Posts
      </NavLink>
      <NavLink
        to="/travelers"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Travelers
      </NavLink>
      <NavLink
        to="/trip/"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Trips
      </NavLink>
      <NavLink to="/" onClick={handleSignOut} className={styles.NavLink}>
        Logout
      </NavLink>
      <NavLink
        to={`/profiles/${currentUser?.profile_id}`}
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        {currentUser?.username}
      </NavLink>
      <Avatar src={currentUser?.profile_image} height={45} />
    </>
  );
  // Links shown when no user is logged in
  const loggedOutLinks = (
    <>
      <NavLink
        exact
        to="/"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        Home
      </NavLink>
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
    <Navbar
      expanded={expanded}
      expand="md"
      className={`${styles.NavBar} shadow`}
      fixed="top"
    >
      <Container fluid>
        {/* Hamburger toggle for mobile view */}
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {/* Show different links based on user login status */}
            {currentUser ? loggedInLinks : loggedOutLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
