import React from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function EditProfile() {
  return (
    <Form>
      <Row>
        <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
          <Container className="d-flex flex-column justify-content-center">
            <Form.Group>
              <Form.Label>Visited Countries</Form.Label>
              <Form.Control
                type="text"
                name="visited_countries"
                value={visited_countries}
              />
            </Form.Group>
            {errors?.visited_countries?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <Form.Group className="text-center">
              <div>
                <Form.Label htmlFor="file-upload">Change your song</Form.Label>
              </div>

              <Form.File id="file-upload" accept="audio/*" />
            </Form.Group>
            {errors?.audio?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
        <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>
      </Row>
    </Form>
  );
}
