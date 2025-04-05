import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import reg_img from "../../assets/reg_img.webp";
import {
  Form,
  Button,
  Col,
  Image,
  Row,
  Container,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { useRedirect } from "../../hooks/useRedirect";

const SignUpForm = () => {
  // Use the custom hook to redirect if already logged in
  useRedirect("loggedIn");
  const [signUpData, setSignUpData] = useState({
    username: "",
    password1: "",
    password2: "",
  });
  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({});
  const history = useHistory();
  // Function to validate fields onChange
  const validateField = (name, value) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      // Validate username
      if (name === "username" && value.trim() === "") {
        newErrors.username = ["Username cannot be empty."];
      } else {
        delete newErrors.username;
      }
      // Validate password 1
      if (name === "password1" && value.length < 8) {
        newErrors.password1 = ["Password must be at least 8 characters long."];
      } else {
        delete newErrors.password1;
      }
      // Validate password 2
      if (name === "password2" && value !== password1) {
        newErrors.password2 = ["Passwords must match."];
      } else {
        delete newErrors.password2;
      }

      return newErrors;
    });
  };
  // Handle input field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUpData((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateField(name, value);
  };
  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/dj-rest-auth/registration/", signUpData);
      history.push("/signin");
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  return (
    <Container className={styles.Container} fluid>
      <Row className={styles.Row}>
        <Col className="my-auto py-2 p-md-2 d-flex align-items-center" md={6}>
          <Container className={`${appStyles.Content} p-4`}>
            <h1 className={styles.Header}>Sign Up</h1>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username" className="mt-3">
                {/* Username input field */}
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={handleChange}
                  aria-label="Username"
                />
              </Form.Group>
              {/* Display username error messages if present */}
              {errors.username?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
              {/* Password input field */}
              <Form.Group controlId="password1" className="mt-3">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Password"
                  name="password1"
                  value={password1}
                  onChange={handleChange}
                  aria-label="Password1"
                />
              </Form.Group>
              {/* Display password1 error messages if present */}
              {errors.password1?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
              {/* Confirm Password input field */}
              <Form.Group controlId="password2" className="mt-3">
                <Form.Label className="d-none">Confirm Password</Form.Label>
                <Form.Control
                  className={styles.Input}
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={handleChange}
                  aria-label="Password2"
                />
              </Form.Group>
              {/* Display password2 error messages if present */}
              {errors.password2?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
              {/* Submit Button */}
              <Button
                className={`${btnStyles.Button} ${btnStyles.Wide} mt-3`}
                type="submit"
                disabled={Object.keys(errors).length > 0}
              >
                Sign Up
              </Button>
              {/* Display non-field error messages (e.g., email already in use) */}
              {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-3">
                  {message}
                </Alert>
              ))}
            </Form>
          </Container>
        </Col>
        {/* Image Column for larger screens */}
        <Col
          md={6}
          className="d-none d-md-flex align-items-center justify-content-center"
        >
          <Image
            className={appStyles.FillerImageRegister}
            src={reg_img}
            fluid
            alt="signup"
          />
        </Col>
        {/* Link to sign in page */}
        <Container className="mt-3">
          <Link className={`${styles.Link} ${styles.SignInLink}`} to="/signin">
            Already have an account? Sign in
          </Link>
        </Container>
      </Row>
    </Container>
  );
};

export default SignUpForm;
