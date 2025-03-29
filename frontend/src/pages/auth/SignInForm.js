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

  const validateField = (name, value) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };

      if (name === "username" && value.trim() === "") {
        newErrors.username = ["Username cannot be empty."];
      } else {
        delete newErrors.username;
      }

      if (name === "password" && value.length < 8) {
        newErrors.password = ["Password must be at least 8 characters long."];
      } else {
        delete newErrors.password;
      }

      return newErrors;
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setSignInData((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      setTokenTimestamp(data);
      history.push("/map");
    } catch (err) {
      setErrors(err.response?.data || {});
    }
  };

  return (
    <Container fluid>
      <Row className={styles.Row}>
        <Col className="my-auto p-0 p-md-2" md={6}>
          <Container className={`${appStyles.Content} p-4`}>
            <h1 className={styles.Header}>Sign In</h1>
            <Form onSubmit={handleSubmit}>
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
              {errors.username?.map((message, idx) => (
                <Alert key={idx} variant="warning">{message}</Alert>
              ))}

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
              {errors.password?.map((message, idx) => (
                <Alert key={idx} variant="warning">{message}</Alert>
              ))}

              <Button
                className={`${btnStyles.Button} ${btnStyles.Wide} mt-3`}
                type="submit"
                disabled={Object.keys(errors).length > 0}
              >
                Sign in
              </Button>

              {errors.non_field_errors?.map((message, idx) => (
                <Alert key={idx} variant="warning" className="mt-3">
                  {message}
                </Alert>
              ))}
            </Form>
          </Container>
          <Container className="mt-3">
            <Link className={styles.Link} to="/signup">
              Don&apos;t have an account? Sign up now!
            </Link>
          </Container>
        </Col>
        <Col
          md={6}
          className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
        >
          <Image className={`${appStyles.FillerImage}`} src={image} alt="signin" />
        </Col>
      </Row>
    </Container>
  );
}

export default SignInForm;
