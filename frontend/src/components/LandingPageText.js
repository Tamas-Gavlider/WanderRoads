import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/LandingPage.module.css';
import btnStyles from '../styles/Button.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';
import { useCurrentUser } from "../contexts/CurrentUserContext";

function LandingPageText() {
  const currentUser = useCurrentUser();
  return (
    <Container className={styles.Container}>
      <Row className={styles.heroRow}>
        <Col>
          <h1 className={styles.heading}>Explore the World, Share Your Adventures</h1>
          <p className={styles.subheading}>Connect with travelers, share memories, and get recommendations for your next journey.</p>
          {!currentUser && <Link to="/signup" className={btnStyles.Button}>
              Start Your Journey
            </Link> }
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPageText;
