import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/LandingPageText.module.css';
import btnStyles from '../styles/Button.module.css';
import { Link } from 'react-router-dom';
import { useCurrentUser } from "../contexts/CurrentUserContext";
import Loading from './Loading';

function LandingPageText() {
  const currentUser = useCurrentUser();
  const [showLandingPage, setShowLandingPage] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowLandingPage(true), 3000);
    return () => clearTimeout(timer); 
  }, []);

  if (!showLandingPage) {
    return <Loading />; 
  }

  return (
    <Container className={styles.Container}>
      <Row className={styles.HeroRow}>
        <Col>
          <h1 className={styles.Heading}>Explore the World, Share Your Adventures</h1>
          <p className={styles.Subheading}>Connect with travelers, share memories, and get recommendations for your next journey.</p>
          {!currentUser && <Link to="/signup" className={`${btnStyles.Button} ${styles.Button}`}>
              Start Your Journey
            </Link>}
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPageText;
