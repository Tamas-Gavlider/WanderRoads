import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import styles from "../../styles/EditStatus.module.css";
import btnStyles from "../../styles/Button.module.css";

export default function EditStatus() {
  const { id } = useParams();
  const history = useHistory();
  const [status, setStatus] = useState("");

  const handleSave = async () => {
    try {
      await axios.put(`/profiles/${id}`, { status });
      history.goBack();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Container className={styles.StatusContainer}>
      <div className={styles.StatusCard}>
        <h2 className={styles.StatusHeading}>Update Your Status</h2>

        <Form.Group>
          <Form.Control
            type="text"
            placeholder="What's on your mind?"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={styles.StatusInput}
            aria-label="status"
          />
        </Form.Group>

        <Button
          className={`mt-3 ${btnStyles.Button} ${styles.SaveButton}`}
          onClick={handleSave}
        >
         Update Status
        </Button>
      </div>
    </Container>
  );
}
