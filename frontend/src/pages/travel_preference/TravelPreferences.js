import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import styles from "../../styles/TravelPreference.module.css";
import AddTravelPreferences from "./AddTravelPreferences";
import { Row, Col, Tooltip, OverlayTrigger } from "react-bootstrap";
import Loading from "../../components/Loading";

// Mapping of continent codes to full names
const continentMapping = {
  AF: "Africa",
  AN: "Antarctica",
  AS: "Asia",
  EU: "Europe",
  NA: "North America",
  OC: "Oceania",
  SA: "South America",
};

export default function TravelPreferences() {
  const currentUser = useCurrentUser();
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      axios
        .get("/travel-preference/")
        .then((response) => {
          console.log("Response data:", response.data);
          if (response.data) {
            setPreferences(response.data);
          } else {
            setPreferences(null);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching travel preferences:", error.response);
          setLoading(false);
        });
    }
  }, [currentUser]);

  if (loading) return <Loading />;
  if (error) return <p className={styles.Error}>{error}</p>;

  const continentCode = preferences?.preferred_continent;
  const continentName =
    continentMapping[continentCode] || continentCode || "Not specified";

  return (
    <div>
      {preferences ? (
        <div>
          <h4 className={styles.Title}>Travel Desires</h4>
          <Link
            to={`/travel-preference/${preferences.id}/edit`}
            className={styles.EditIcon}
          >
            <i className="fa-solid fa-pen"></i>
          </Link>

          <Row>
            <Col xs={4} sm={4} md={4} lg={4}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Preferred continent</Tooltip>}
              >
                <div className={styles.PreferenceItem}>
                  <i className="fa-solid fa-globe"></i>
                  <p>{continentName}</p>
                </div>
              </OverlayTrigger>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Preferred climate</Tooltip>}
              >
                <div className={styles.PreferenceItem}>
                  <i className="fa-solid fa-temperature-half"></i>
                  <p>{preferences.climate || "Not specified"}</p>
                </div>
              </OverlayTrigger>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Preferred activity</Tooltip>}
              >
                <div className={styles.PreferenceItem}>
                  <i className="fa-solid fa-person-hiking"></i>
                  <p>{preferences.activity || "Not specified"}</p>
                </div>
              </OverlayTrigger>
            </Col>
          </Row>

          <Row>
            <Col xs={4} sm={4} md={4} lg={4}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Budget preference</Tooltip>}
              >
                <div className={styles.PreferenceItem}>
                  <i className="fa-solid fa-money-check-dollar"></i>
                  <p>{preferences.budget || "Not specified"}</p>
                </div>
              </OverlayTrigger>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Travel style</Tooltip>}
              >
                <div className={styles.PreferenceItem}>
                  <i className="fa-solid fa-route"></i>
                  <p>{preferences.travel_style || "Not specified"}</p>
                </div>
              </OverlayTrigger>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4}>
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Preferred trip duration</Tooltip>}
              >
                <div className={styles.PreferenceItem}>
                  <i className="fa-solid fa-calendar-days"></i>
                  <p>{preferences.duration || "Not specified"}</p>
                </div>
              </OverlayTrigger>
            </Col>
          </Row>
        </div>
      ) : (
        <AddTravelPreferences />
      )}
    </div>
  );
}
