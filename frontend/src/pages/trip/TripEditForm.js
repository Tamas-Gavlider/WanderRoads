import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { axiosReq } from "../../api/axiosDefaults";
import Button from "react-bootstrap/Button";
import { Col } from "react-bootstrap";
import btnStyles from "../../styles/Button.module.css";

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

  useEffect(() => {
    if (!countries.length) return; // Ensure countries are loaded
  
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(`/trip/${id}`);
        console.log("Fetched Trip Data:", data);
  
        const matchingCountry = countries.find((c) => c.name === data.destination);
        const countryCode = matchingCountry ? matchingCountry.code : ""; 
  
        setTripData((prev) => ({
          ...prev,
          destination: countryCode,
        }));
      } catch (err) {
        console.error("Error fetching trip details:", err);
        history.push("/");
      }
    };
  
    fetchData();
  }, [id, history, countries]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedTripData = { ...tripData, [name]: value };
    if (name === "end_date" && updatedTripData.end_date < updatedTripData.start_date) {
      setErrors({ ...errors, end_date: "End date cannot be earlier than start date." });
    } else {
      setErrors({ ...errors, end_date: "" }); 
    }

    setTripData(updatedTripData);
  };

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (new Date(tripData.end_date) < new Date(tripData.start_date)) {
      setErrors({ ...errors, end_date: "End date cannot be earlier than start date." });
      return; 
    }

    try {
      await axiosReq.put(`/trip/${id}`, tripData);
      history.goBack();
    } catch (err) {
      console.error(err);
      setErrors(err.response?.data || {});
    }
  };
  
  return (
    <Form onSubmit={handleSubmit} className="text-center">
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
      <Form.Group>
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="start_date"
          value={tripData.start_date}
          onChange={handleChange}
          className="text-center"
          aria-label="start-date"
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="end_date"
          value={tripData.end_date}
          onChange={handleChange}
          className="text-center"
          aria-label="end-date"
        />
      </Form.Group>
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
      <Col className="py-2 mx-auto text-center" >
      <Button className={`${btnStyles.Button} ${btnStyles.Wide}`} onClick={() => history.goBack()}>
        Cancel
      </Button>
      </Col>
      <Col className="py-2 mx-auto text-center" >
      <Button className={`${btnStyles.Button} ${btnStyles.Wide}`} type="submit">
        Save
      </Button>
      </Col>
    </Form>
  );
}
