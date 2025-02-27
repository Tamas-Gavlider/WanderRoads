import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function TravelPreferenceEditForm() {
  const [errors, setErrors] = useState({});
  const [postData, setPostData] = useState({
    preferred_continent: "",
    climate: "",
    activity: "",
    budget: "",
    travel_style: "",
    duration: "",
  });

  const { preferred_continent, climate, activity, budget, travel_style, duration } = postData;
  const history = useHistory();
  const { id } = useParams();

  
  const CONTINENTS = [
    ["ANY", "Any Continent"],
    ["AF", "Africa"],
    ["NA", "North America"],
    ["OC", "Oceania"],
    ["AN", "Antarctica"],
    ["AS", "Asia"],
    ["EU", "Europe"],
    ["SA", "South America"],
  ];

  const CLIMATE_CHOICES = [
    ["ANY", "Any"],
    ["HOT", "Hot"],
    ["COLD", "Cold"],
    ["TROPICAL", "Tropical"],
    ["MILD", "Mild"],
  ];

  const ACTIVITY_CHOICES = [
    ["ANY", "Any"],
    ["CULTURE", "Culture & History"],
    ["NATURE", "Nature & Wildlife"],
    ["BEACH", "Beaches & Islands"],
    ["ADVENTURE", "Adventure & Hiking"],
    ["CITY", "City & Nightlife"],
    ["FOOD", "Food & Culinary"],
  ];

  const BUDGET_CHOICES = [
    ["ANY", "Any"],
    ["LOW", "Budget-Friendly"],
    ["MEDIUM", "Mid-Range"],
    ["HIGH", "Luxury"],
  ];

  const TRAVEL_STYLE_CHOICES = [
    ["ANY", "Any"],
    ["SOLO", "Solo Travel"],
    ["FAMILY", "Family"],
    ["BACKPACKING", "Backpacking"],
    ["LUXURY", "Luxury Travel"],
  ];

  const DURATION_CHOICES = [
    ["ANY", "Any"],
    ["WEEKEND", "Weekend"],
    ["ONE_WEEK", "1 Week"],
    ["TWO_WEEKS", "2 Weeks"],
    ["MONTH", "1 Month"],
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(`/travel-preference/`);
        const { 
          preferred_continent, 
          climate, 
          activity, 
          budget, 
          travel_style, 
          duration,
          owner,
        } = data;

        if (!owner) {
          history.push("/");
        } else {
          setPostData({ preferred_continent, climate, activity, budget, travel_style, duration });
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [history, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosReq.put(`/travel-preference/`, postData);
      history.push(`/travel-preference/`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
        console.log(errors)
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-center">
      <Form.Group>
        <Form.Label>Preferred Continent</Form.Label>
        <Form.Control as="select" name="preferred_continent" value={preferred_continent} onChange={handleChange}>
          {CONTINENTS.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Climate</Form.Label>
        <Form.Control as="select" name="climate" value={climate} onChange={handleChange}>
          {CLIMATE_CHOICES.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Activity</Form.Label>
        <Form.Control as="select" name="activity" value={activity} onChange={handleChange}>
          {ACTIVITY_CHOICES.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Budget</Form.Label>
        <Form.Control as="select" name="budget" value={budget} onChange={handleChange}>
          {BUDGET_CHOICES.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Travel Style</Form.Label>
        <Form.Control as="select" name="travel_style" value={travel_style} onChange={handleChange}>
          {TRAVEL_STYLE_CHOICES.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Duration</Form.Label>
        <Form.Control as="select" name="duration" value={duration} onChange={handleChange}>
          {DURATION_CHOICES.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Form.Control>
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
