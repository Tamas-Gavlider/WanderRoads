import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import styles from '../../styles/Trip.module.css'
import { axiosRes } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import {MoreDropDown} from '../../components/MoreDropdown'


export default function Trip() {
  const currentUser = useCurrentUser();
  const [trip, setTrip] = useState(null);
  const history = useHistory()

  useEffect(() => {
    if (currentUser) {
      axios
        .get("/trip/")
        .then((response) => {
          console.log("Trip: ", response.data);
          
          // Sort trips by start_date (ascending order)
          const sortedTrips = response.data.results.sort((a, b) => {
            return new Date(a.start_date) - new Date(b.start_date); // Sorting based on start date
          });
          
          setTrip({ ...response.data, results: sortedTrips }); // Set sorted trips in state
        })
        .catch((error) => {
          console.error("Error fetching travel preferences:", error);
        });
    }
  }, [currentUser]);

  const handleEdit = () => {
    history.push(`/trip/${trip.id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/trip/${trip.id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Upcoming Trips</h2>
      <div className="d-flex justify-content-start mb-3">
        <Link to="/trip/create">
          <i className="fa-solid fa-plus"></i>
        </Link>
      </div>
      {trip && trip.results && trip.results.length > 0 ? (
        <Row className="g-4">
          < MoreDropDown 
          handleEdit={handleEdit}
          handleDelete={handleDelete}/>
          {trip.results.map((t, index) => (
            <Col md={6} lg={4} key={index}>
              <Card
                className={`shadow-sm border-0 ${t.days_until_trip > 5 ? styles.Card : styles.Soon}`}>
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
