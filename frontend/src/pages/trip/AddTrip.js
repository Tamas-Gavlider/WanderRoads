import React, { useState, useEffect } from "react";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import axios from "axios";
import { axiosReq } from "../../api/axiosDefaults";
import { useHistory} from "react-router-dom";
import btnStyles from "../../styles/Button.module.css";
import { Form } from "react-bootstrap";
import {Button} from "react-bootstrap";

export default function AddTrip() {
  const currentUser = useCurrentUser();
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
    setTripData({
      ...tripData,
      [event.target.name]: event.target.value,
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
        console.log(err);
        if (err.response?.status !== 401) {
          setErrors(err.response?.data);
        }
      }
    };

  return (
    <div>
      <Form.Group>
        <Form.Label>Destination</Form.Label>
        <Form.Control
          as="select"
          name="destination"
          value={destination}
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

      <Form.Group controlId="start_date">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="start_date"
          value={start_date}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group controlId="end_date">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="end_date"
          value={end_date}
          onChange={handleChange}
        />
      </Form.Group>
      <Button className={btnStyles.Button} onClick={() => history.goBack()}>
        cancel
      </Button>
      <Button className={btnStyles.Button} type="submit">
        create
      </Button>
    </div>
  );
}
