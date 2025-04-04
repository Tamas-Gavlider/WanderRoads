import React, { useState } from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Col, Modal, Button } from "react-bootstrap";
import Media from "react-bootstrap/Media";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import iconStyles from "../../styles/MoreDropdown.module.css";
import Avatar from "../../components/Avatar";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    country_name,
    title,
    content,
    image,
    created_at,
    postPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  // State to handle modal visibility
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
    } catch (err) {
     // Silently ignore the error - keep comment to avoid parsing error 
    }
  };

  // Show/Hide delete confirmation modal
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  return (
    <Col xs={10} sm={8} md={7} lg={8}>
      <Card className={styles.Post}>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              {/* Show dropdown only if owner and on individual post page */}
              {is_owner && postPage && (
                <MoreDropdown
                  handleEdit={handleEdit}
                  handleDelete={handleShowDeleteModal}
                />
              )}
              <span>
                {created_at} - {country_name}
              </span>
            </div>
            <Link to={`/profiles/${profile_id}`} className={styles.Profile}>
              <Avatar src={profile_image} />
              <span className={styles.User}>{owner}</span>
            </Link>
          </Media>
        </Card.Body>
        {/* Post Image with link to post detail */}
        <Link to={`/posts/${id}/`}>
          <Card.Img
            src={image}
            alt={title}
            loading="lazy"
            className={styles.Image}
          />
        </Link>
        {/* Post Title and Content */}
        <Card.Body>
          {title && <Card.Title className="text-center">{title}</Card.Title>}
          {content && (
            <Card.Text>
              <p className={styles.Content}>{content}</p>
            </Card.Text>
          )}
          {/* Comments Icon and Count */}
          <Link to={`/posts/${id}/`} aria-label="Comment this post">
            <i className={`far fa-comments ${iconStyles.Icon}`} />
            <p className={styles.Hidden}>hidden text</p>
          </Link>
          {comments_count}
        </Card.Body>
      </Card>
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

export default Post;
