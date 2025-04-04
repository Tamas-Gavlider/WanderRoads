import React, { useState } from "react";
import { Media, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import CommentEditForm from "./CommentEditForm";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setPost,
    setComments,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const [showEditForm, setShowEditForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Function to handle comment deletion
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);

      if (setPost) {
        setPost((prevPost) => ({
          results:
            prevPost?.results?.map((post) => ({
              ...post,
              comments_count: Math.max(0, post.comments_count - 1),
            })) || [],
        }));
      }
      // If comments data is being updated, remove the deleted comment from the list
      if (setComments) {
        setComments((prevComments) => ({
          ...prevComments,
          results:
            prevComments?.results?.filter((comment) => comment.id !== id) || [],
        }));
      }

      setShowDeleteModal(false); // Close the delete confirmation modal after successful deletion
    } catch (err) {
      setErrorMessage("Failed to delete comment. Please try again.");
    }
  };

  return (
    <>
      <hr />
      <Media>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          {/* Display owner name and comment update date */}
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{updated_at}</span>
          {/* Show either the comment content or the edit form */}
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {/* Show MoreDropdown (edit/delete options) if the user is the owner of the comment */}
        {is_owner && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={() => setShowDeleteModal(true)}
          />
        )}
      </Media>
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this comment?
          {/* Display error message if any */}
          {errorMessage && <p className="text-danger mt-2">{errorMessage}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Comment;
