import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Asset from "../../components/Asset";
import styles from "../../styles/TravelPreference.module.css";
import BtnStyles from "../../styles/Button.module.css";
import ListGroup from "react-bootstrap/ListGroup";
import AddTravelPreference from "./AddTravelPreferences";

export default function TravelPreferences() {
  const currentUser = useCurrentUser();
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      axios
        .get("/travel-preference/")
        .then((response) => {
          console.log("Response data:", response.data);  // Debugging
          if (response.data && response.data.id) {
            setPreferences(response.data);  // Directly set the object as preferences
          } else {
            setPreferences(null); // No preferences set
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching travel preferences:", error);
          setLoading(false);
        });
    }
  }, [currentUser]);

  if (loading) return <Asset message="Loading travel preferences..." />;

  return (
    <div>
      {preferences ? (
        <div>
          <h3 className={styles.Title}>Travel Preferences</h3>
          <ListGroup horizontal className="d-flex flex-wrap my-2">
            <ListGroup.Item className={styles.BorderRed}>
              <p><strong>Continent:</strong> {preferences.preferred_continent}</p>
            </ListGroup.Item>
            <ListGroup.Item className={styles.BorderBlue}>
              <p><strong>Climate:</strong> {preferences.climate}</p>
            </ListGroup.Item>
            <ListGroup.Item className={styles.BorderRed}> 
              <p><strong>Activity:</strong> {preferences.activity}</p>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup horizontal className="d-flex flex-wrap my-2">
            <ListGroup.Item className={styles.BorderBlue}>
              <p><strong>Budget:</strong> {preferences.budget}</p>
            </ListGroup.Item>
            <ListGroup.Item className={styles.BorderRed}>
              <p><strong>Travel Style:</strong> {preferences.travel_style}</p>
            </ListGroup.Item>
            <ListGroup.Item className={styles.BorderBlue}> 
              <p><strong>Duration:</strong> {preferences.duration}</p>
            </ListGroup.Item>
          </ListGroup>
          <Link to={`/travel-preference/${preferences.id}/edit`} className={BtnStyles.Button}>
            Edit Preferences
          </Link>
        </div>
      ) : (
        <div>
          < AddTravelPreference />
        </div>
      )}
    </div>
  );
}
