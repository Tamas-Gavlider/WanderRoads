import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'
import {NavLink} from 'react-router-dom'
import { useCurrentUser } from '../contexts/CurrentUserContext';


const NavBar = () => {

  return (
    <Navbar expand="lg" className={styles.NavBar} fixed="to">
      <Container fluid>
        <NavLink to='/'>
        <Navbar.Brand ><img src={logo} alt="logo" height="100"/></Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink exact to="/" className={styles.NavLink} activeClassName={styles.Active}>Map</NavLink>
            <NavLink to="/profile" className={styles.NavLink} activeClassName={styles.Active}>Profile</NavLink>
            <NavLink to="/posts" className={styles.NavLink} activeClassName={styles.Active}>Posts</NavLink>
            <NavLink to="/travel-buddies" className={styles.NavLink}activeClassName={styles.Active} >Travel Buddies</NavLink>
            <NavLink to="/logout" className={styles.NavLink} activeClassName={styles.Active}>Logout</NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar