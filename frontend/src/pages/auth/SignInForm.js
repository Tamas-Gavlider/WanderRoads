import React, { useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import { Link, useHistory } from "react-router-dom";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import image from "../../assets/sign_in_img.webp";
import { useRedirect } from "../../hooks/useRedirect";
import { setTokenTimestamp } from "../../utils/utils";

function SignInForm() {
  const setCurrentUser = useSetCurrentUser();
  useRedirect("loggedIn");

  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = signInData;
  const [errors, setErrors] = useState({});

  const history = useHistory();
  // Validates individual fields on change
  const validateField = (name, value) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (name === "username") {
        if (value.trim() === "") {
          newErrors.username = ["Username cannot be empty."];
        } else {
          delete newErrors.username;
        }
      }

      if (name === "password") {
        if (value.length < 8) {
          newErrors.password = ["Password must be at least 8 characters long."];
        } else {
          delete newErrors.password;
        }
      }

      return newErrors;
    });
  };
  // Handles input changes and triggers field validation
  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };
  // Submits the login form
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Final validation before submit
    const newErrors = {};
    if (!username.trim()) newErrors.username = ["Username cannot be empty."];
    if (!password.trim()) newErrors.password = ["Password cannot be empty."];

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.push("/map");
    } catch (err) {
      // Handles and formats error messages from API
      if (err.response?.data) {
        const formattedErrors = { ...err.response.data };
        if (
          formattedErrors.username?.includes("This field may not be blank.")
        ) {
          formattedErrors.username = ["Username cannot be empty."];
        }
        if (
          formattedErrors.password?.includes("This field may not be blank.")
        ) {
          formattedErrors.password = ["Password cannot be empty."];
        }

        setErrors(formattedErrors);
      }
    }
  };

  return (
    <Container fluid>
      <Row className={styles.Row}>
        <Col className="my-auto p-0 p-md-2" md={6}>
          <Container className={`${appStyles.Content} p-4`}>
            <h1 className={styles.Header}>Sign In</h1>
            <Form onSubmit={handleSubmit}>
              {/* Username input */}
              <Form.Group controlId="username" className="mt-3">
                <Form.Label className="d-none">Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  className={styles.Input}
                  value={username}
                  onChange={handleChange}
                  aria-label="Username"
                />
              </Form.Group>
              {/* Display username validation errors */}
              {errors.username?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}
              {/* Password input */}
              <Form.Group controlId="password" className="mt-3">
                <Form.Label className="d-none">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  className={styles.Input}
                  value={password}
                  onChange={handleChange}
                  aria-label="Password"
                />
              </Form.Group>
              {/* Display password validation errors */}
              {errors.password?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                  {message}
                </Alert>
              ))}

              <Button
                className={`${btnStyles.Button} ${btnStyles.Wide} mt-3`}
                type="submit"
                disabled={errors.username || errors.password}
              >
                Sign in
              </Button>
              {/* General login errors (e.g., incorrect credentials) */}
              {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-3">
                  {message}
                </Alert>
              ))}
            </Form>
          </Container>
          {/* Link to sign up page */}
          <Container className="mt-3">
            <Link className={styles.Link} to="/signup">
              Don&apos;t have an account? Sign up now!
            </Link>
          </Container>
        </Col>
        {/* Sign-in image (visible on larger screens) */}
        <Col
          md={6}
          className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
        >
          <Image
            className={`${appStyles.FillerImage}`}
            src={image}
            alt="signin"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default SignInForm;
