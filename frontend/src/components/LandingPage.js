import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from '../styles/LandingPage.module.css'

function LandingPage() {
  return (
    <Container>
      <Row>
        <Col><p className={styles.tagline}>Your Journey</p></Col>
        <Col></Col>
        <Col><p className={styles.tagline}>Your Memory</p></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col xs={5}><p className={styles.tagline}>Your Story</p></Col>
        <Col></Col>
      </Row>
    </Container>
  );
}

export default LandingPage;