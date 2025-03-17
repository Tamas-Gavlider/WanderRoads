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
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [visitedCountries, setVisitedCountries] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`/profiles/${id}`);
        setVisitedCountries(data.visited_countries || []);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [id]);

  
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await axios.get("/countries/");
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleAddCountry = () => {
    if (selectedCountry && !visitedCountries.includes(selectedCountry)) {
      setVisitedCountries([...visitedCountries, selectedCountry]);
    }
  };

  const handleRemoveCountry = (countryToRemove) => {
    setVisitedCountries(visitedCountries.filter((c) => c !== countryToRemove));
  };

  const handleSave = async () => {
    try {
      await axios.put(`/profiles/${id}`, {
        visited_countries: visitedCountries,
      });
      history.goBack();
    } catch (error) {
      console.error("Error updating visited countries:", error);
    }
  };

  return (
    <Container className={`d-flex flex-column justify-content-center ${styles.Container}`}>
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
