import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/LandingPage.module.css';
import { Link } from 'react-router-dom/cjs/react-router-dom';

function LandingPageText() {
  return (
    <Container>
      <Row className={styles.heroRow}>
        <Col>
          <h1 className={styles.heading}>Explore the World, Share Your Adventures</h1>
          <p className={styles.subheading}>Connect with travelers, share memories, and get recommendations for your next journey.</p>
          <Link to="/signup">
              <button className={styles.ctaButton}>Start Your Journey</button>
            </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPageText;
