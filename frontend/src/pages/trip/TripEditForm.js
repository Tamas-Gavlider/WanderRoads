import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import { axiosReq } from "../../api/axiosDefaults";
import Button from "react-bootstrap/Button";
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
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(`/trip/${id}`);
        setTripData(data);
      } catch (err) {
        console.error("Error fetching trip details:", err);
        history.push("/");
      }
    };
    fetchData();
  }, [id, history]);

  const handleChange = (event) => {
    setTripData({
      ...tripData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
          value={tripData.destination}
          onChange={handleChange}
          required
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
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="end_date"
          value={tripData.end_date}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Notes</Form.Label>
        <Form.Control
          type="text"
          name="notes"
          value={tripData.notes}
          onChange={handleChange}
        />
      </Form.Group>
      <Button className={btnStyles.Button} onClick={() => history.goBack()}>
        Cancel
      </Button>
      <Button className={btnStyles.Button} type="submit">
        Save
      </Button>
    </Form>
  );
}
