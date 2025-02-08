import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../assets/logo.png'
import styles from '../styles/NavBar.module.css'


const NavBar = () => {
  return (
    <Navbar expand="lg" className={styles.NavBar} fixed="to">
      <Container fluid>
        <Navbar.Brand ><img src={logo} alt="logo" height="125"/></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Map</Nav.Link>
            <Nav.Link href="#action2">Profile</Nav.Link>
            <Nav.Link href="#action3">Posts</Nav.Link>
            <Nav.Link href="#action4">Travel Buddies</Nav.Link>
            <Nav.Link href="#action5">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar