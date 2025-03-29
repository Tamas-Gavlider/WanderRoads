import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import styles from "../../styles/AddTrip.module.css";

export default function AddTrip() {
  const [errors, setErrors] = useState({});
  const [tripData, setTripData] = useState({
    destination: "",
    start_date: "",
    end_date: "",
    notes: "",
  });

  const { destination, start_date, end_date, notes } = tripData;
  const [countries, setCountries] = useState([]);
  const history = useHistory();

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

  const handleChange = (event) => {
    const { name, value } = event.target;
  
    setTripData((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
  
      if (name === "start_date" || name === "end_date") {
        const updatedStartDate = name === "start_date" ? new Date(value) : new Date(tripData.start_date);
        const updatedEndDate = name === "end_date" ? new Date(value) : new Date(tripData.end_date);
  
        if (updatedStartDate && updatedEndDate && updatedEndDate < updatedStartDate) {
          newErrors.end_date = ["End date cannot be earlier than start date."];
        } else {
          delete newErrors.end_date;
        }
      }
  
      return newErrors;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("destination", destination);
    formData.append("start_date", start_date);
    formData.append("end_date", end_date);
    formData.append("notes", notes);

    try {
      const { data } = await axiosReq.post("/trip/", formData);
      console.log({ data });
      history.push(`/trip/${data.id}`);
    } catch (err) {
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  return (
    <div className={styles.Form}>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="destination">
              <Form.Label>Destination</Form.Label>
              <Form.Control
                as="select"
                name="destination"
                value={destination}
                onChange={handleChange}
                required
              >
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.code} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="start_date">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={start_date}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.start_date?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
          </Col>

          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="end_date">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={end_date}
                onChange={handleChange}
              />
            </Form.Group>
             {errors.end_date?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                              {message}
                            </Alert>
                          ))}
          </Col>

          <Col xs={12} md={6} lg={6}>
            <Form.Group controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="text"
                name="notes"
                value={notes}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col xs={12} md={6} lg={12} className="d-flex justify-content-between">
            <Button
              className={`${btnStyles.Button} ${btnStyles.Wide}`}
              onClick={() => history.goBack()}
            >
              Cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Wide}`} type="submit">
              Create
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
