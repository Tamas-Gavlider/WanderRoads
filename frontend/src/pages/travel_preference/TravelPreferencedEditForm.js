import React, {useState, useEffect} from 'react'
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import btnStyles from "../../styles/Button.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function TravelPreferencedEditForm() {

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

    useEffect(() => {
        const handleMount = async () => {
          try {
            const { data } = await axiosReq.get(`/travel-preference/${id}/`);
            const { preferred_continent, climate, activity, budget, travel_style, duration, is_owner } = data;
    
            is_owner
              ? setPostData({ preferred_continent, climate, activity, budget, travel_style, duration  })
              : history.push("/");
          } catch (err) {
            console.log(err);
          }
        };
        handleMount();
  }, [history, id]);

  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };
   
  const handleSubmit = async (event) => {
      event.preventDefault();
      const formData = new FormData();
  
      formData.append("preferred_continent", preferred_continent);
      formData.append("climate", climate);
      formData.append("activity", activity);
      formData.append("budget", budget);
      formData.append("travel_style", travel_style);
      formData.append("duration", duration);
  
      try {
        await axiosReq.put(`/travel-preference/${id}/`, formData);
        history.push(`/travel-preference/${id}`);
      } catch (err) {
        console.log(err);
        if (err.response?.status !== 401) {
          setErrors(err.response?.data);
        }
      }
    };

    const textFields = (
        <div className="text-center">
      <Form.Group>
        <Form.Label>Preferred Continent</Form.Label>
        <Form.Control
          type="text"
          name="preferred_continent"
          value={preferred_continent}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Climate</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="climate"
          value={climate}
          onChange={handleChange}
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      <Form.Group>
        <Form.Label>Activity</Form.Label>
        <Form.Control
          as="textarea"
          name="activity"
          value={activity}
          onChange={handleChange}
        >
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Budget</Form.Label>
        <Form.Control
          as="textarea"
          name="budget"
          value={budget}
          onChange={handleChange}
        >
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Travel style</Form.Label>
        <Form.Control
          as="textarea"
          name="travel_style"
          value={travel_style}
          onChange={handleChange}
        >
        </Form.Control>
      </Form.Group>
      <Form.Group>
        <Form.Label>Duration</Form.Label>
        <Form.Control
          as="textarea"
          name="duration"
          value={duration}
          onChange={handleChange}
        >
        </Form.Control>
      </Form.Group>
      <Button className={btnStyles.Button} onClick={() => history.goBack()}>
        cancel
      </Button>
      <Button className={btnStyles.Button} type="submit">
        save
      </Button>
    </div>
    )
  return (
    <div>{textFields}</div>
  )
}
