import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../../styles/CommentCreateEditForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";

function CommentCreateForm(props) {
  const { post, setPost, setComments } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPost((prevPost) => ({
        results: [
          {
            ...prevPost.results[0],
            comments_count: prevPost.results[0].comments_count + 1,
          },
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.CommentFormContainer}>
      <Form className="mt-2 w-50" onSubmit={handleSubmit}>
        <Form.Group>
          <InputGroup>
            <Form.Control
              className={styles.Form}
              placeholder="My comment..."
              as="textarea";;
              value={content}
              onChange={handleChange}
              rows={2}
              aria-label="comment"
            />
            <button
              className={`${styles.Button} btn`}
              disabled={!content.trim()}
              type="submit"
            >
              Post
            </button>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}

export default CommentCreateForm;
