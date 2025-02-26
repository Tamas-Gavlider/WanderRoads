import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


export default function TravelPreferencesEditForm() {
  const [errors, setErrors] = useState({});
  const [choices, setChoices] = useState({});
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosReq.get(`/travel-preference/${id}/`);
        const {
          preferred_continent,
          climate,
          activity,
          budget,
          travel_style,
          duration,
          is_owner,
          preferred_continent_choices,
          climate_choices,
          activity_choices,
          budget_choices,
          travel_style_choices,
          duration_choices,
        } = data;

        if (!is_owner) {
          history.push("/");
        } else {
          setPostData({ preferred_continent, climate, activity, budget, travel_style, duration });
          setChoices({
            preferred_continent_choices,
            climate_choices,
            activity_choices,
            budget_choices,
            travel_style_choices,
            duration_choices,
          });
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
      await axiosReq.put(`/travel-preference/${id}/`, postData);
      history.push(`/travel-preference/${id}`);
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
      {/* Preferred Continent Dropdown */}
      <Form.Group>
        <Form.Label>Preferred Continent</Form.Label>
        <Form.Control as="select" name="preferred_continent" value={preferred_continent} onChange={handleChange}>
          {choices.preferred_continent_choices?.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Climate Dropdown */}
      <Form.Group>
        <Form.Label>Climate</Form.Label>
        <Form.Control as="select" name="climate" value={climate} onChange={handleChange}>
          {choices.climate_choices?.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Activity Dropdown */}
      <Form.Group>
        <Form.Label>Activity</Form.Label>
        <Form.Control as="select" name="activity" value={activity} onChange={handleChange}>
          {choices.activity_choices?.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Budget Dropdown */}
      <Form.Group>
        <Form.Label>Budget</Form.Label>
        <Form.Control as="select" name="budget" value={budget} onChange={handleChange}>
          {choices.budget_choices?.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Travel Style Dropdown */}
      <Form.Group>
        <Form.Label>Travel Style</Form.Label>
        <Form.Control as="select" name="travel_style" value={travel_style} onChange={handleChange}>
          {choices.travel_style_choices?.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Duration Dropdown */}
      <Form.Group>
        <Form.Label>Duration</Form.Label>
        <Form.Control as="select" name="duration" value={duration} onChange={handleChange}>
          {choices.duration_choices?.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </Form.Control>
      </Form.Group>

      {/* Submit and Cancel Buttons */}
      <Button className={btnStyles.Button} onClick={() => history.goBack()}>Cancel</Button>
      <Button className={btnStyles.Button} type="submit">Save</Button>
    </Form>
  );
}