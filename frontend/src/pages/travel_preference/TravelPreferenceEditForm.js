import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import btnStyles from "../../styles/Button.module.css";

export default function TravelPreferenceEditForm() {
  const [errors, setErrors] = useState({});
  const [preferencesData, setPreferencesData] = useState({
    preferred_continent: "",
    climate: "",
    activity: "",
    budget: "",
    travel_style: "",
    duration: "",
  });

  const { id } = useParams(); 
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(`/travel-preference/${id}/`); 
        setPreferencesData(data);
      } catch (err) {
        console.error("Error fetching travel preferences:", err);
        history.push("/");
      }
    };

    fetchData();
  }, [id, history]);

  const handleChange = (event) => {
    setPreferencesData({
      ...preferencesData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosReq.put(`/travel-preference/${id}/`, preferencesData); 
      history.goBack(); 
    } catch (err) {
      console.error(err);
      setErrors(err.response?.data || {});
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-center">
      <Form.Group>
        <Form.Label>Preferred Continent</Form.Label>
        <Form.Control as="select" name="preferred_continent" className="text-center" value={preferencesData.preferred_continent} onChange={handleChange}>
          <option value="ANY">Any Continent</option>
          <option value="AF">Africa</option>
          <option value="NA">North America</option>
          <option value="SA">South America</option> 
          <option value="AS">Asia</option>
          <option value="EU">Europe</option>
          <option value="OC">Oceania</option> 
          <option value="AN">Antarctica</option> 
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Climate</Form.Label>
        <Form.Control as="select" name="climate" className="text-center" value={preferencesData.climate} onChange={handleChange}>
          <option value="ANY">Any</option>
          <option value="HOT">Hot</option>
          <option value="COLD">Cold</option>
          <option value="TROPICAL">Tropical</option>
          <option value="MILD">Mild</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Activity</Form.Label>
        <Form.Control as="select" name="activity" className="text-center" value={preferencesData.activity} onChange={handleChange}>
          <option value="ANY">Any</option>
          <option value="CULTURE">Culture & History</option>
          <option value="NATURE">Nature & Wildlife</option>
          <option value="BEACH">Beaches & Islands</option>
          <option value="ADVENTURE">Adventure & Hiking</option>
          <option value="CITY">City & Nightlife</option>
          <option value="FOOD">Food & Culinary</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Budget</Form.Label>
        <Form.Control as="select" name="budget" className="text-center" value={preferencesData.budget} onChange={handleChange}>
          <option value="ANY">Any</option>
          <option value="LOW">Budget-Friendly</option>
          <option value="MEDIUM">Mid-Range</option>
          <option value="HIGH">Luxury</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Travel Style</Form.Label>
        <Form.Control as="select" name="travel_style" className="text-center" value={preferencesData.travel_style} onChange={handleChange}>
          <option value="ANY">Any</option>
          <option value="SOLO">Solo Travel</option>
          <option value="FAMILY">Family</option>
          <option value="BACKPACKING">Backpacking</option>
          <option value="LUXURY">Luxury Travel</option>
        </Form.Control>
      </Form.Group>

      
      <Form.Group>
        <Form.Label>Duration</Form.Label>
        <Form.Control as="select" name="duration" className="text-center" value={preferencesData.duration} onChange={handleChange}>
          <option value="ANY">Any</option>
          <option value="WEEKEND">Weekend</option>
          <option value="ONE_WEEK">1 Week</option>
          <option value="TWO_WEEKS">2 Weeks</option>
          <option value="MONTH">1 Month</option>
        </Form.Control>
      </Form.Group>

      <Button className={`${btnStyles.Button} ${btnStyles.Wide} mt-3`} onClick={() => history.goBack()}>
        Cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Wide} mt-3`} type="submit">
        Save
      </Button>
    </Form>
  );
}
