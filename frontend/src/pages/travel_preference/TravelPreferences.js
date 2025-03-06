import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import Asset from "../../components/Asset";
import styles from "../../styles/TravelPreference.module.css";
import BtnStyles from "../../styles/Button.module.css";
import AddTravelPreference from "./AddTravelPreferences";
import { Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import Loading from '../../components/Loading'

// Mapping of continent codes to full names
const continentMapping = {
  "AF": "Africa",
  "AN": "Antarctica",
  "AS": "Asia",
  "EU": "Europe",
  "NA": "North America",
  "OC": "Oceania",
  "SA": "South America",
};

export default function TravelPreferences() {
  const currentUser = useCurrentUser();
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      axios
        .get("/travel-preference/")
        .then((response) => {
          console.log("Response data:", response.data);  
          if (response.data && response.data.id) {
            setPreferences(response.data); 
          } else {
            setPreferences(null); 
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching travel preferences:", error);
          setLoading(false);
        });
    }
  }, [currentUser]);

  if (loading) return <Loading/>;

  const continentName = continentMapping[preferences.preferred_continent] || preferences.preferred_continent;

  return (
    <div>
      {preferences ? (
        <div>
          <h4 className={styles.Title}>Travel Desires</h4>
          <Link to={`/travel-preference/${preferences.id}/edit`}>
          <i class="fa-solid fa-pen"></i>
          </Link>
          <Row>
            <Col md={4}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="continent-tooltip">Represents the preferred continent for travel.</Tooltip>}
              >
                <div className={styles.PreferenceItem}>
                  <i className="fa-solid fa-globe"></i>
                  <p>{continentName}</p>
                </div>
              </OverlayTrigger>
            </Col>
            <Col md={4}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="climate-tooltip">Represents the preferred climate for travel.</Tooltip>}
              >
                <div className={styles.PreferenceItem}>
                  <i className="fa-solid fa-temperature-half"></i>
                  <p>{preferences.climate}</p>
                </div>
              </OverlayTrigger>
            </Col>
            <Col md={4}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="activity-tooltip">Represents the preferred activity for travel.</Tooltip>}
              >
                <div className={styles.PreferenceItem}>
                  <i className="fa-solid fa-person-hiking"></i>
                  <p>{preferences.activity}</p>
                </div>
              </OverlayTrigger>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="budget-tooltip">Represents the budget for travel.</Tooltip>}
              >
                <div className={styles.PreferenceItem}>
                  <i className="fa-solid fa-money-check-dollar"></i>
                  <p>{preferences.budget}</p>
                </div>
              </OverlayTrigger>
            </Col>
            <Col md={4}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="travel-style-tooltip">Represents the preferred travel style.</Tooltip>}
              >
                <div className={styles.PreferenceItem}>
                  <i className="fa-solid fa-route"></i>
                  <p>{preferences.travel_style}</p>
                </div>
              </OverlayTrigger>
            </Col>
            <Col md={4}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip id="duration-tooltip">Represents the preferred duration of travel.</Tooltip>}
              >
                <div className={styles.PreferenceItem}>
                  <i className="fa-solid fa-calendar-days"></i>
                  <p>{preferences.duration}</p>
                </div>
              </OverlayTrigger>
            </Col>
          </Row>
        </div>
      ) : (
        <AddTravelPreference />
      )}
    </div>
  );
}
