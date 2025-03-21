import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import styles from "../../styles/Trip.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { MoreDropdown } from "../../components/MoreDropdown";

export default function Trip() {
  const currentUser = useCurrentUser();
  const [trip, setTrip] = useState(null);
  const history = useHistory();


  useEffect(() => {
    if (currentUser) {
      axios
        .get("/trip/")
        .then(async (response) => {
          console.log("Trip: ", response.data);
  
          // Filter out expired trips
          const validTrips = response.data.results.filter((t) => t.days_until_trip >= 0);
  
          // Sort trips by start_date 
          const sortedTrips = validTrips.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
  
          setTrip({ ...response.data, results: sortedTrips }); 
  
          // Automatically delete expired trips from the backend
          const expiredTrips = response.data.results.filter((t) => t.days_until_trip < 0);
          for (let trip of expiredTrips) {
            try {
              await axiosRes.delete(`/trip/${trip.id}`);
              console.log(`Deleted expired trip: ${trip.destination}`);
            } catch (err) {
              console.error(`Error deleting expired trip ${trip.id}:`, err);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching trips:", error);
        });
    }
  }, [currentUser]);

  
  const handleEdit = (tripId) => {
    history.push(`/trip/${tripId}/edit`); 
  };

  const handleDelete = async (tripId) => {
    try {
      await axiosRes.delete(`/trip/${tripId}`); 
      setTrip((prevTrip) => ({
        ...prevTrip,
        results: prevTrip.results.filter((t) => t.id !== tripId), 
      }));
    } catch (err) {
      console.error("Error deleting trip:", err);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className={`text-center mb-4 ${styles.Title}`}>Upcoming Trips</h2>
      <div className="d-flex justify-content-start mb-3">
        <Link to="/trip/create">
          <i className="fa-solid fa-plus"></i> 
          <p className={styles.Hidden}>hidden text</p>
        </Link>
      </div>

      {trip && trip.results && trip.results.length > 0 ? (
        <Row className="g-4">
          {trip.results.map((t) => (
            <Col md={6} lg={4} key={t.id}>
              <Card
                className={`shadow-sm border-0 ${
                  t.days_until_trip > 5 ? styles.Card : styles.Soon
                }`}
              >
                <Card.Body>
                  <Card.Title>
                    <MoreDropdown
                      handleEdit={() => handleEdit(t.id)}
                      handleDelete={() => handleDelete(t.id)}
                    />{" "}
                    {t.destination}
                  </Card.Title>
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
