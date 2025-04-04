import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { axiosReq } from "../../api/axiosDefaults";
import Button from "react-bootstrap/Button";
import { Row, Col, Alert } from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/AddTrip.module.css";

export default function TripEditForm() {
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [tripData, setTripData] = useState({
    destination: "",
    start_date: "",
    end_date: "",
    notes: "",
  });

  const { id } = useParams();
  const history = useHistory();

  // Fetch the list of available countries from the API when the component mounts.
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await axios.get("/countries/");
        setCountries(data);
      } catch {
        // Silently ignore the error or handle it silently
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (!countries.length) return; // Ensure countries are loaded before fetching trip data

    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(`/trip/${id}`);
        // Find the corresponding country code for the destination
        const matchingCountry = countries.find(
          (c) => c.name === data.destination
        );
        const countryCode = matchingCountry ? matchingCountry.code : "";

        setTripData({
          destination: countryCode || "",
          start_date: data.start_date,
          end_date: data.end_date,
          notes: data.notes || "",
        });
      } catch {
        history.push("/");
      }
    };

    fetchData();
  }, [id, history, countries]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setTripData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (name === "start_date" || name === "end_date") {
        const updatedStartDate =
          name === "start_date"
            ? new Date(value)
            : new Date(tripData.start_date);
        const updatedEndDate =
          name === "end_date" ? new Date(value) : new Date(tripData.end_date);

        // Ensure the end date is not before the start date.
        if (
          updatedStartDate &&
          updatedEndDate &&
          updatedEndDate < updatedStartDate
        ) {
          newErrors.end_date = "End date cannot be earlier than start date.";
        } else {
          delete newErrors.end_date;
        }

        // Ensure the start date is not after the end date.
        if (
          updatedStartDate &&
          updatedEndDate &&
          updatedStartDate > updatedEndDate
        ) {
          newErrors.start_date = "Start date cannot be later than end date.";
        } else {
          delete newErrors.start_date;
        }
      }

      return newErrors;
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Prevent submission if end date is earlier than start date.
    if (new Date(tripData.end_date) < new Date(tripData.start_date)) {
      setErrors((prev) => ({
        ...prev,
        end_date: "End date cannot be earlier than start date.",
      }));
      return;
    }

    try {
      await axiosReq.put(`/trip/${id}`, tripData);
      history.goBack();
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  return (
    <div className={styles.Form}>
      <Form onSubmit={handleSubmit} className="text-center">
        <Row className="mb-3">
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Destination</Form.Label>
              <Form.Control
                as="select"
                name="destination"
                value={tripData.destination || ""}
                onChange={handleChange}
                required
                className="text-center"
              >
                <option value="">Select a country</option>
                {countries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={tripData.start_date || ""}
                onChange={handleChange}
                className="text-center"
                aria-label="start-date"
              />
            </Form.Group>
            {errors.start_date && (
              <Alert variant="warning">{errors.start_date}</Alert>
            )}
          </Col>

          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={tripData.end_date || ""}
                onChange={handleChange}
                className="text-center"
                aria-label="end-date"
              />
            </Form.Group>
            {errors.end_date && (
              <Alert variant="warning">{errors.end_date}</Alert>
            )}
          </Col>

          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="text"
                name="notes"
                value={tripData.notes}
                onChange={handleChange}
                className="text-center"
                aria-label="notes"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} className="d-flex justify-content-between">
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide}`}
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide}`}
              type="submit"
            >
              Save
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
