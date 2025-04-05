import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import styles from "../../styles/AddCountry.module.css";
import btnStyles from "../../styles/Button.module.css";

export default function AddCountry() {
  const { id } = useParams();
  const history = useHistory();
  // State variable for storing the list of countries available for selection
  const [countries, setCountries] = useState([]);
  // State variable for storing the selected country from the dropdown
  const [selectedCountry, setSelectedCountry] = useState("");
  // State variable for storing the list of visited countries
  const [visitedCountries, setVisitedCountries] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`/profiles/${id}`);
        setVisitedCountries(data.visited_countries || []);
      } catch (error) {
        // Silently ignore the error or handle it silently
      }
    };

    fetchProfile();
  }, [id]);

  // Fetch the list of available countries for selection
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await axios.get("/countries/");
        setCountries(data); // Store countries in state
      } catch (error) {
       // Silently ignore the error - keep comment to avoid parsing error 
      }
    };

    fetchCountries();
  }, []);

  // Add the selected country to the visited countries list, if it's not already in the list
  const handleAddCountry = () => {
    if (selectedCountry && !visitedCountries.includes(selectedCountry)) {
      setVisitedCountries([...visitedCountries, selectedCountry]); // Update the visited countries list
    }
  };
  // Remove a country from the visited countries list
  const handleRemoveCountry = (countryToRemove) => {
    setVisitedCountries(visitedCountries.filter((c) => c !== countryToRemove));
  };
  // Save the updated visited countries list to the user's profile
  const handleSave = async () => {
    try {
      await axios.put(`/profiles/${id}`, {
        visited_countries: visitedCountries,
      });
      history.goBack();
    } catch (error) {
      // Silently ignore the error or handle it silently
    }
  };

  return (
    <Container
      className={`d-flex flex-column justify-content-center ${styles.Container}`}
    >
      {/* Add a visited country */}
      <Form.Group controlId="countrySelect">
        <Form.Label>Select a Country</Form.Label>
        <Form.Control
          as="select"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Choose a country</option>
          {countries.map((c) => (
            <option key={c.code} value={c.name}>
              {c.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button
        variant="primary"
        onClick={handleAddCountry}
        className={`mt-2 ${btnStyles.Button}`}
      >
        Add Country
      </Button>

      {/* Visited countries with a remove button */}
      <h4 className="mt-4">Visited Countries:</h4>
      <div className="row">
        {visitedCountries.map((country, index) => (
          <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={index}>
            <div className={styles.Country}>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleRemoveCountry(country)}
                className={styles.Delete}
              >
                Remove
              </Button>
              <span className={styles.Visited}> {country}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Save changes and go back to profile */}
      <Button
        variant="success"
        onClick={handleSave}
        className={`mt-3 ${btnStyles.Button}`}
      >
        Save Changes
      </Button>
    </Container>
  );
}
