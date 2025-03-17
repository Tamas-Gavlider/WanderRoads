import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { ListGroup, Container } from "react-bootstrap";
import styles from "../../styles/TravelRecommendation.module.css";

export default function TravelRecommendation() {
  const currentUser = useCurrentUser();
  const [recommendation, setRecommendation] = useState();

  useEffect(() => {
    if (currentUser) {
      axios
        .get("/travel-recommendation/")
        .then((response) => {
          setRecommendation(response.data);
        })
        .catch((error) => {
          console.error("Error fetching travel preferences:", error);
        });
    }
  }, [currentUser]);

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <Container className={styles.Container}>
      <h4 className={styles.Heading}>Places You May Enjoy</h4>

      {recommendation && recommendation.results.length > 0 ? (
        <ListGroup horizontal="md" className={styles.ListContainer}>
          {recommendation.results[0].recommended_destination.map((destination, index) => (
            <ListGroup.Item key={index} className={styles.ListItem}>
              {capitalize(destination)}
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className={styles.NoData}>No recommendations available.</p>
      )}
    </Container>
  );
}
