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
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import Avatar from "./Avatar";
import { removeTokenTimestamp } from "../utils/utils";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
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
        to="/feed"
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
      to="/trip/"
      className={styles.NavLink}
        activeClassName={styles.Active}>
          Trips
      </NavLink>
      <NavLink to="/" onClick={handleSignOut} className={styles.NavLink}>
        Logout
      </NavLink>
      <NavLink to={`/profiles/${currentUser?.profile_id}`} className={styles.NavLink}>
      {currentUser?.username}
    </NavLink>
    <Avatar src={currentUser?.profile_image} height={45}/>
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
    <Navbar
      expanded={expanded}
      expand="md"
      className={styles.NavBar}
      fixed="top"
    >
      <Container fluid>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="70" />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls="basic-navbar-nav"
        />
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
