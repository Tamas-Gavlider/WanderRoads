import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
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
    <div>
      <h2>Edit Status</h2>
      <Form.Group>
        <Form.Label>Status</Form.Label>
        <Form.Control
          type="text"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        />
      </Form.Group>
      <Button className={`mt-3 ${btnStyles.Button}`} onClick={handleSave}>
        Save
      </Button>
    </div>
  );
}
