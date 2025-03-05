import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import btnStyles from '../../styles/Button.module.css'
import styles from '../../styles/Trip.module.css'

export default function Trip() {
  const currentUser = useCurrentUser();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    if (currentUser) {
      axios
        .get("/trip/")
        .then((response) => {
          console.log("Trip: ", response.data);
          setTrip(response.data);
        })
        .catch((error) => {
          console.error("Error fetching travel preferences:", error);
        });
    }
  }, [currentUser]);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Upcoming Trips</h2>
      <div className="d-flex justify-content-start mb-3">
        <Link to="/trip/create">
          <Button className={btnStyles.Button}>Add Trip</Button>
        </Link>
      </div>
      {trip && trip.results && trip.results.length > 0 ? (
        <Row className="g-4">
          {trip.results.map((t, index) => (
            <Col md={6} lg={4} key={index}>
              <Card
                className={`shadow-sm border-0 ${t.days_until_trip < 5 ? styles.Soon : styles.Color}`}>
                <Card.Body>
                  <Card.Title>{t.destination}</Card.Title>
                  <Card.Subtitle className="mb-2">
                    <strong>Trip starts in {t.days_until_trip} days</strong>
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Departure:</strong> {t.start_date} <br />
                    <strong>Return:</strong> {t.end_date}
                  </Card.Text>
                  {t.notes && <Card.Text>{t.notes}</Card.Text>}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-muted text-center">No upcoming trips...</p>
      )}
    </Container>
  );
}
