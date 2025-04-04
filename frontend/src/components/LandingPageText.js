import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/LandingPageText.module.css";
import btnStyles from "../styles/Button.module.css";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";

function LandingPageText() {
  const currentUser = useCurrentUser();
  return (
    <Container className={styles.Container}>
      <Row className={styles.HeroRow}>
        <Col>
          <h1 className={styles.Heading}>
            Explore the World, Share Your Adventures
          </h1>
          <p className={styles.Subheading}>
            Connect with travelers, share memories, and get recommendations for
            your next journey.
          </p>
          {/* Show 'Start Your Journey' button only if the user is not logged in */}
          {!currentUser && (
            <Link to="/signup" className={btnStyles.Button}>
              Start Your Journey
            </Link>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default LandingPageText;
