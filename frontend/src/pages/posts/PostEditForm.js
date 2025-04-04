import React, { useEffect, useRef, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import axios from "axios";
import styles from "../../styles/PostCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory, useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Asset from "../../components/Asset";

function PostEditForm() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    image: "",
    country: "",
  });

  const { title, content, image, country } = postData;
  // Countries list for dropdown
  const [countries, setCountries] = useState([]);
  // Ref to access the file input directly
  const imageInput = useRef(null);
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    const handleMount = async () => {
      setLoading(true); // Start loading spinner
      try {
        const { data } = await axiosReq.get(`/posts/${id}/`);
        // Only allow editing if the user is the owner
        if (data.is_owner) {
          setPostData({
            title: data.title,
            content: data.content,
            image: data.image,
            country: data.country,
          });
        } else {
          history.push("/");
        }
      } catch (err) {
        // Silently ignore the error - keep comment to avoid parsing error
      } finally {
        setLoading(false); // Stop loading spinner
      }
    };

    handleMount();
  }, [history, id]);

  // Handle text input changes
  const handleChange = (event) => {
    setPostData({
      ...postData,
      [event.target.name]: event.target.value,
    });
  };
  // Handle image input changes
  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      // Revoke old image preview URL
      URL.revokeObjectURL(image);
      // Create new preview URL for the selected image
      setPostData({
        ...postData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  // Fetch list of countries for the dropdown
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await axios.get("/countries/");
        setCountries(data);
      } catch (error) {
        // Silently ignore the error - keep comment to avoid parsing error
      }
    };

    fetchCountries();
  }, []);

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    // Append new image file if it exists
    if (imageInput?.current?.files[0]) {
      formData.append("image", imageInput.current.files[0]);
    }

    formData.append("country", country);

    try {
      await axiosReq.put(`/posts/${id}/`, formData);
      history.push(`/posts/${id}`);
    } catch (err) {
      // Silently ignore the error - keep comment to avoid parsing error
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          aria-label="title"
        />
      </Form.Group>
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group>
        <Form.Label>Content</Form.Label>
        <Form.Control
          as="textarea"
          rows={6}
          name="content"
          value={content}
          onChange={handleChange}
          aria-label="content"
        />
      </Form.Group>
      {errors?.content?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}
      {/* Country dropdown */}
      <Form.Group>
        <Form.Label>Country</Form.Label>
        <Form.Control
          as="select"
          name="country"
          value={country}
          onChange={handleChange}
          required
          aria-label="country"
        >
          <option value="">Select a country</option>
          {countries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
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
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        {/* Image section */}
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group className="text-center">
              <figure>
                {/* Show loading spinner or the image */}
                {loading ? (
                  <Asset spinner message="Loading image..." />
                ) : (
                  <Image
                    className={appStyles.Image}
                    src={image}
                    rounded
                    alt="post image"
                    onLoad={() => setLoading(false)}
                  />
                )}
              </figure>
              {/* Image upload label */}
              <div>
                <Form.Label
                  className={`${btnStyles.Button} btn`}
                  htmlFor="image-upload"
                >
                  Change the image
                </Form.Label>
              </div>
              {/* Image upload input */}
              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            {/* Show text fields below image on mobile */}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        {/* Text fields on side for larger screens */}
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}

export default PostEditForm;
