import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../../styles/CommentCreateEditForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";

function CommentCreateForm(props) {
  const { post, setPost, setComments } = props;
  const [content, setContent] = useState("");

  // Handle the change in the textarea
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      // Update the comments state with the new comment
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results], // Add the new comment at the beginning of the list
      }));
      // Update the post's comment count
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1, // Increment comment count
          },
        ],
      }));
      setContent("");
    } catch (err) {
      // Silently ignore the error - keep comment to avoid parsing error
    }
  };

  return (
    <div className={styles.CommentFormContainer}>
      <Form className="mt-2 w-50" onSubmit={handleSubmit}>
        <Form.Group>
          <InputGroup>
            {/* Text area for entering the comment */}
            <Form.Control
              className={styles.Form}
              placeholder="My comment..."
              as="textarea"
              value={content}
              onChange={handleChange}
              rows={2}
              aria-label="comment"
            />
            {/* Submit button */}
            <button
              className={styles.Button}
              disabled={!content.trim()}
              type="submit"
              aria-label="Submit comment"
            >
              <i className={`fa-solid fa-paper-plane ${styles.Icon}`}></i>
              <span className={styles.Hidden}>Text</span>
            </button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CommentCreateForm;
